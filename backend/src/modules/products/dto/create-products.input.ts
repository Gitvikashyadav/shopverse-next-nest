import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class CreateProductsInput {
  @Field(() => [CreateProductInput])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductInput)
  products: CreateProductInput[];
}