import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Twilio;

  constructor() {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (sid && token) {
      this.client = new Twilio(sid, token);
    }
  }

  async sendOrderConfirmation(
    phone: string,
    orderId: string,
    amount: number,
    deliveryCode: string,
  ) {
    if (!this.client) {
      this.logger.warn('Twilio not configured, skipping WhatsApp message');
      return;
    }

    // Indian numbers need country code — adjust if your numbers aren't always 10-digit local
    const toNumber = phone.startsWith('+') ? phone : `+91${phone}`;
    console.log('wastap no from', process.env.TWILIO_WHATSAPP_FROM);
    console.log('contact no.', toNumber);

    try {
      await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${toNumber}`,
        body: `✅ Order Confirmed!\nOrder #${orderId.slice(-8).toUpperCase()}\nAmount: $${amount}\nDelivery code: ${deliveryCode}\n\nShare this code with the delivery agent when your order arrives.`,
      });
    } catch (error) {
        console.log("see Actual error message ",error);
        
      this.logger.error('Failed to send WhatsApp message', error);
    }
  }
}
