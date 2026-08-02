import {
  Resolver,
  Mutation,
  Args,
  Context,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

// import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthPayload } from './dto/auth.type';
import { GqlLocalAuthGuard } from 'src/common/guards/gql-local-auth.guard';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  ping() {
    return 'pong';
  }

  @Mutation(() => AuthPayload)
  async signup(@Args('registerDto') registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);

    return result;
  }

  @Mutation(() => AuthPayload) //AuthPayload here tells what response return
  @UseGuards(GqlLocalAuthGuard)
  async login(@Args('loginDto') loginDto: LoginDto, @Context() context) {
    // GqlLocalAuthGuard has already run LocalStrategy.validate()
    // and attached the validated user to context.req.user
    return this.authService.login(context.req.user);
  }
}
