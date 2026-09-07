import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({
  timestamps: true,
})
@ObjectType()
export class Tenant {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({
    required: true,
    unique: true,
  })
  databaseName: string;
  
  @Field()
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Field()
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  domain: string;

  @Field()
  @Prop({
    default: '#2563EB',
  })
  primaryColor: string;

  @Field()
  @Prop({
    default: '#EFF6FF',
  })
  secondaryColor: string;

  @Field()
  @Prop({
    default: true,
  })
  paymentEnabled: boolean;

  @Field()
  @Prop({
    default: true,
  })
  adminEnabled: boolean;

  @Field()
  @Prop({
    default: true,
  })
  wishlistEnabled: boolean;

  @Field()
  @Prop({
    default: true,
  })
  reviewsEnabled: boolean;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
