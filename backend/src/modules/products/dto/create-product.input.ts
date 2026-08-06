import { Field, Float, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  slug: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @Field()
  @IsString()
  category: string;

  @Field()
  @IsString()
  image: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  badge?: string;

  @Field()
  @IsString()
  description: string;
}