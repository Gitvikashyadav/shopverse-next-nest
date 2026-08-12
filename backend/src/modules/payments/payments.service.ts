import { Injectable } from '@nestjs/common';
import Razorpay = require('razorpay');
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay;
  private readonly keySecret: string;

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error(
        'RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in .env',
      );
    }

    this.keySecret = keySecret;
    this.razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }

  async createOrder(amount: number, currency = 'INR') {
    const order = await this.razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    return order;
  }

  verifySignature(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.keySecret) // ← uses the guaranteed-defined field
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  }
}
