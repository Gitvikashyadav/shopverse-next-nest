import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order, OrderSchema } from './entities/order.entity';
import { MailModule } from '../mail/mail.module'; //
import { MailService } from '../mail/mail.service';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
WhatsappModule],
  providers: [OrdersService, OrdersResolver,MailService],
  exports: [MailService],
}) 
export class OrdersModule {}