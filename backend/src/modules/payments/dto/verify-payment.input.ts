import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class VerifyPaymentInput {
  @Field()
  @IsString()
  razorpay_order_id: string;

  @Field()
  @IsString()
  razorpay_payment_id: string;

  @Field()
  @IsString()
  razorpay_signature: string;
}