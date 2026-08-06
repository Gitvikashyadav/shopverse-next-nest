import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  badge?: string;

  @Field({ nullable: true })
  description?: string;
}