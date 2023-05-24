import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindAddressDto } from './dto/find-address.dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @Res() res) {
    const link = await this.orderService.addOrder(dto);
    res.clearCookie('cart');
    res.json({link: link.payment_link})
  }

  @Get('/:id')
  getAllUserOrders(@Param('id') user_id: number) {
    return this.orderService.getAllUserOrders(user_id);
  }

  @Get('/tg/:id')
  getAllUserOrdersTg(@Param('id') id: number) {
    return this.orderService.getAllUserOrdersTg(id);
  }

  @Post('/address-tips')
  getAddress(@Body() address: FindAddressDto) {
    return this.orderService.getAddress(address.address);
  }
}
