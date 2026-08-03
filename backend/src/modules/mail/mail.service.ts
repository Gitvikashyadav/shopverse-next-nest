import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      secure: false, // true for port 465, false for 587 (STARTTLS)
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.pass'),
      },
    });
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('mail.from'),
      to: email,
      subject: 'Your Password Reset Code',
      html: `
        <p>You requested a password reset.</p>
        <p>Your verification code is:</p>
        <h2 style="letter-spacing: 4px;">${otp}</h2>
        <p>This code will expire in 15 minutes. If you didn't request this, you can ignore this email.</p>
      `,
    });
  }
}