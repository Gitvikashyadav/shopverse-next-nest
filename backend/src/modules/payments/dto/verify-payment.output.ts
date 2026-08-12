import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VerifyPaymentOutput {
  @Field()
  verified: boolean;

  @Field({ nullable: true })
  paymentId?: string;
}