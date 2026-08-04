import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';

const OTP_EXPIRY_MINUTES = 15;

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  // Generates a 6-digit numeric OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Hash the OTP before storing — never store the raw OTP in the DB
  private hashOtp(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  async requestPasswordReset(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      // As requested: explicitly error if email doesn't exist.
      // (Note: for production, many apps return a generic success message
      // here instead, to avoid leaking which emails are registered.)
      throw new NotFoundException('No account found with this email');
    }

    const otp = this.generateOtp();
    const hashedOtp = this.hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    user.resetPasswordToken = hashedOtp;
    user.resetPasswordExpires = expiresAt;
    await user.save();

    await this.mailService.sendPasswordResetOtp(email, otp);

    return {
      success: true,
      message: 'A verification code has been sent to your email',
    };
  }

  async verifyResetToken(token: string) {
    const hashedToken = this.hashOtp(token);

    const user = await this.userModel.findOne({
      resetPasswordToken: hashedToken,
    });
    console.log("hashedToken",hashedToken);
    console.log("!user || !user.resetPasswordExpires",!user || !user.resetPasswordExpires);
    
    if (!user || !user.resetPasswordExpires) {
      return { valid: false };
    }

    const isExpired = user.resetPasswordExpires.getTime() < Date.now();
    if (isExpired) {
      return { valid: false };
    }

    return {
      valid: true,
      email: user.email,
      expiresAt: user.resetPasswordExpires,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = this.hashOtp(token);

    const user = await this.userModel.findOne({
      resetPasswordToken: hashedToken,
    });

    if (!user || !user.resetPasswordExpires) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    const isExpired = user.resetPasswordExpires.getTime() < Date.now();
    if (isExpired) {
      throw new BadRequestException('Reset code has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires =null;
    await user.save();

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}