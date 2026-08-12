import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GenerateDescriptionOutput {
  @Field()
  description: string;
}