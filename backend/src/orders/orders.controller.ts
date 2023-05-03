import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.addOrder(dto);
  }

  @Get('/:id')
  getAllUserOrders(@Param('id') user_id: number) {
    return this.orderService.getAllUserOrders(user_id);
  }
}
