import { Resolver, Mutation, Args, Float } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateOrderInput } from './dto/create-order.input';
import { VerifyPaymentInput } from './dto/verify-payment.input';
import { RazorpayOrder } from './dto/razorpay-order.output';
import { VerifyPaymentOutput } from './dto/verify-payment.output';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => RazorpayOrder)
  async createRazorpayOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    const order = await this.paymentsService.createOrder(
      createOrderInput.amount,
      createOrderInput.currency,
    );
    return order;
  }

  @Mutation(() => VerifyPaymentOutput)
  async verifyRazorpayPayment(
    @Args('verifyPaymentInput') verifyPaymentInput: VerifyPaymentInput,
  ) {
    const isValid = this.paymentsService.verifySignature(
      verifyPaymentInput.razorpay_order_id,
      verifyPaymentInput.razorpay_payment_id,
      verifyPaymentInput.razorpay_signature,
    );

    if (!isValid) {
      throw new BadRequestException('Payment verification failed');
    }

    return {
      verified: true,
      paymentId: verifyPaymentInput.razorpay_payment_id,
    };
  }
}