import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateTenantInput {
  @Field()
  @IsString()
  @Length(2, 100)
  name: string;

  @Field()
  @IsString()
  @Length(3, 255)
  domain: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  paymentEnabled?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  adminEnabled?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  wishlistEnabled?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  reviewsEnabled?: boolean;
}