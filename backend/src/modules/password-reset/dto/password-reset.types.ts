import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RequestPasswordResetPayload {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@ObjectType()
export class VerifyResetTokenPayload {
  @Field()
  valid: boolean;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  expiresAt?: Date;
}

@ObjectType()
export class ResetPasswordPayload {
  @Field()
  success: boolean;

  @Field()
  message: string;
}