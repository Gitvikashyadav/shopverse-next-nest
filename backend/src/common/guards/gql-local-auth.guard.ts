import { ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql/dist/tests/lib/index.js';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { loginDto } = ctx.getArgs();
    req.body = { email: loginDto.email, password: loginDto.password }; // manually recreate req.body
    return req;
  }
}GqlExecutionContext