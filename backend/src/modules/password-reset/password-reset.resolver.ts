import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PasswordResetService } from './password-reset.service';
import {
  RequestPasswordResetPayload,
  VerifyResetTokenPayload,
  ResetPasswordPayload,
} from './dto/password-reset.types';

@Resolver()
export class PasswordResetResolver {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Mutation(() => RequestPasswordResetPayload)
  async requestPasswordReset(@Args('email') email: string) {
    return this.passwordResetService.requestPasswordReset(email);
  }
cd
  @Query(() => VerifyResetTokenPayload)
  async verifyResetToken(@Args('token') token: string) {
    return this.passwordResetService.verifyResetToken(token);
  }

  @Mutation(() => ResetPasswordPayload)
  async resetPassword(
    @Args('token') token: string,
    @Args('password') password: string,
  ) {
    return this.passwordResetService.resetPassword(token, password);
  }
}
