import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}