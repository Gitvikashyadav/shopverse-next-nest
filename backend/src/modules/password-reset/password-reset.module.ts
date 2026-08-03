import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetResolver } from './password-reset.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
  ],
  providers: [PasswordResetService, PasswordResetResolver],
})
export class PasswordResetModule {}