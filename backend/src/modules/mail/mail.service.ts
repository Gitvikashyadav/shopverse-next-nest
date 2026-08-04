// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter: nodemailer.Transporter;

//   constructor(private readonly configService: ConfigService) {
//     this.transporter = nodemailer.createTransport({
//       host: this.configService.get<string>('mail.host'),
//       port: this.configService.get<number>('mail.port'),
//       secure: false, // true for port 465, false for 587 (STARTTLS)
//       auth: {
//         user: this.configService.get<string>('mail.user'),
//         pass: this.configService.get<string>('mail.pass'),
//       },
//     });
//   }

//   async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
//     await this.transporter.sendMail({
//       from: this.configService.get<string>('mail.from'),
//       to: email,
//       subject: 'Your Password Reset Code',
//       html: `
//         "use client";

// import { Suspense } from "react";
// import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
// import AuthShell from "@/components/auth/AuthShell";

// export default function ResetPasswordPage() {
//   return (
//     <Suspense
//       fallback={
//         <AuthShell title="Reset password" subtitle="Loading your secure link...">
//           <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
//         </AuthShell>
//       }
//     >
//       <ResetPasswordForm />
//     </Suspense>
//   );
// }

//       `,
//     });
//   }
// }
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
      secure: false,
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.pass'),
      },
    });
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    // This URL points to your Next.js frontend's reset-password PAGE,
    // with the OTP/token attached as a query param.
    // Adjust the domain/port to match your actual frontend deployment.
    const frontendUrl =
      this.configService.get<string>('frontendUrl') || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/auth/reset-password?token=${otp}`;

    await this.transporter.sendMail({
      from: this.configService.get<string>('mail.from'),
      to: email,
      subject: 'Your Password Reset Code',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the button below to continue:</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${resetLink}"
               style="background:#4f46e5;color:#fff;padding:12px 24px;
                      border-radius:8px;text-decoration:none;display:inline-block;">
              Reset Password
            </a>
          </p>
          <p>Or use this verification code directly on the reset page:</p>
          <h3 style="letter-spacing: 4px; text-align: center;">${otp}</h3>
          <p style="color:#666; font-size: 13px;">
            This code will expire in 15 minutes. If you didn't request this,
            you can safely ignore this email.
          </p>
        </div>
      `,
    });
  }
}