import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@ObjectType()
export class ConfirmDeliveryOutput {
  @Field()
  ok: boolean;

  @Field({ nullable: true })
  error?: string;

  @Field(() => Order, { nullable: true })
  order?: Order;
}