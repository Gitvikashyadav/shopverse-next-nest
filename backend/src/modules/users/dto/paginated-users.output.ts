import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  total: number;
}