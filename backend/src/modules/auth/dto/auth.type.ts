import { User } from '../../users/entities/user.entity';
import { InputType, ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}