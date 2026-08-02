import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],// exists ONLY inside UsersModule by default
  exports: [UsersService],//<-- this makes it AVAILABLE to other modules too
})
export class UsersModule {}