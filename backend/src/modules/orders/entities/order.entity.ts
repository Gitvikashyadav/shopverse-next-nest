import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@ObjectType()
export class OrderItem {
  @Field()
  productId: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  qty: number;
}

@ObjectType()
export class OrderAddress {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  pincode: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: string;

  @Field({ nullable: true })
  @Prop()
  customerName?: string;

  @Field({ nullable: true })
  @Prop()
  customerEmail?: string;

  @Field(() => [OrderItem])
  @Prop({ type: [Object], required: true })
  items: OrderItem[];

  @Field(() => OrderAddress)
  @Prop({ type: Object, required: true })
  address: OrderAddress;

  @Field(() => Float)
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  method: string; // upi | card | nb | cod

  @Field({ nullable: true })
  @Prop()
  paymentId?: string;

  @Field()
  @Prop({ default: 'placed' })
  status: string; // placed | shipped | delivered | cancelled

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @Prop()
  deliveryCode?: string;

  @Field({ nullable: true })
  deliveredAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
