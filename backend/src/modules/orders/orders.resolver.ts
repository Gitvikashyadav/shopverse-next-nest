import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { PlaceOrderInput } from './dto/create-order.input';
import { PaginatedOrders } from './dto/paginated-orders.output';
import { ConfirmDeliveryOutput } from './dto/confirm-delivery.output';
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: PlaceOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => PaginatedOrders, { name: 'orders' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return this.ordersService.findAll(skip, take);
  }

  @Mutation(() => ConfirmDeliveryOutput)
  confirmDelivery(
    @Args('orderId') orderId: string,
    @Args('code') code: string,
  ) {
    return this.ordersService.confirmWithCode(orderId, code);
  }
}
