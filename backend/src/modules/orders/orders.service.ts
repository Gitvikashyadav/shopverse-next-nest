import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { PlaceOrderInput } from './dto/create-order.input';
import { WhatsappService } from '../whatsapp/whatsapp.service';
@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly whatsappService: WhatsappService,
  ) {}
  private makeCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  async create(input: PlaceOrderInput): Promise<OrderDocument> {
    const order = new this.orderModel({
      ...input,
      status: 'booked',
      deliveryCode: this.makeCode(),
    });
    const saved = await order.save();
    const phone = saved.address?.phone;
   
    
    if (phone) {
      this.whatsappService
        .sendOrderConfirmation(
          phone,
          saved.id,
          saved.amount,
          saved.deliveryCode??'',
        )
        .catch((err) =>
          this.logger.error('Failed to send WhatsApp message', err),
        );
    }
    return saved;
  }

  async findAll(
    skip = 0,
    take = 10,
  ): Promise<{ orders: OrderDocument[]; total: number }> {
    const [orders, total] = await Promise.all([
      this.orderModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(take)
        .exec(),
      this.orderModel.countDocuments().exec(),
    ]);
    return { orders, total };
  }

  async confirmWithCode(orderId: string, code: string) {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) return { ok: false, error: 'Order not found' };
    if (order.status === 'delivered')
      return { ok: false, error: 'Already delivered' };
    if (order.deliveryCode !== code.trim())
      return { ok: false, error: 'Invalid code' };

    order.status = 'delivered';
    order.deliveredAt = new Date();
    await order.save();
    return { ok: true, order };
  }
}
