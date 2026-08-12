import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => Float)
  @IsNumber()
  @Min(1)
  amount: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  currency?: string;
}