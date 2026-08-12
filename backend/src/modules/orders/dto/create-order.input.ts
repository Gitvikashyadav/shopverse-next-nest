import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class OrderItemInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  image: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => Int)
  @IsNumber()
  qty: number;
}

@InputType()
class OrderAddressInput {
  @Field() @IsString() name: string;
  @Field() @IsString() phone: string;
  @Field() @IsString() address: string;
  @Field() @IsString() city: string;
  @Field() @IsString() state: string;
  @Field() @IsString() pincode: string;
}

@InputType()
export class PlaceOrderInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  customerName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @Field(() => [OrderItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];

  @Field(() => OrderAddressInput)
  @ValidateNested()
  @Type(() => OrderAddressInput)
  address: OrderAddressInput;

  @Field(() => Float)
  @IsNumber()
  amount: number;

  @Field()
  @IsString()
  method: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paymentId?: string;
}