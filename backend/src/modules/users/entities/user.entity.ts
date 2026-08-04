import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>; //is bridge add extra like id and by deafault
@ObjectType()
@Schema({ timestamps: true, toObject: { virtuals: true } }) // auto adds createdAt & updatedAt
export class User {
  @Field(() => ID)
  id: string; // virtual field, mapped from Mongo's _id — see note below

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string; // NO @Field() — never expose password in GraphQL schema

  @Field()
  @Prop({ default: 'user' })
  role: string; // 'user' | 'admin'


  // ── Password reset fields — NO @Field() on either ──
@Prop({ type: String, default: null })
resetPasswordToken: string | null;

@Prop({ type: Date, default: null })
resetPasswordExpires: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
