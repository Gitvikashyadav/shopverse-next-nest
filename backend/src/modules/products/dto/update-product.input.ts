

import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  badge?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}