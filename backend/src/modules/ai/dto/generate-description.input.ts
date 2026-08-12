import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, Min } from 'class-validator';

@InputType()
export class GenerateDescriptionInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;
}