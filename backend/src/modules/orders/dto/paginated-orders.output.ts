import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@ObjectType()
export class PaginatedOrders {
  @Field(() => [Order])
  orders: Order[];

  @Field(() => Int)
  total: number;
}