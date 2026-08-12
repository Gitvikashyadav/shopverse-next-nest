

import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  slug: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Float)
  @Prop({ required: true })
  price: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  oldPrice?: number;

  @Field()
  @Prop({ required: true })
  category: string;

  @Field()
  @Prop({ required: true })
  image: string;

  @Field({ nullable: true })
  @Prop()
  badge?: string;

  @Field()
  @Prop({ required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Text index so $text search works across name + category
ProductSchema.index({ name: 'text', category: 'text' });
