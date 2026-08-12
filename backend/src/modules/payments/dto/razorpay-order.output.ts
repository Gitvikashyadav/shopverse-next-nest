import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class RazorpayOrder {
  @Field()
  id: string;

  @Field(() => Float)
  amount: number;

  @Field()
  currency: string;
}