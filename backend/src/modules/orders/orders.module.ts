import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}