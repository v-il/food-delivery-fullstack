import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import * as randomstring from 'randomstring';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async addOrder(dto: CreateOrderDto) {
    const order = await this.orderRepository.create({
      ...dto,
      payment_link: randomstring.generate(12),
    });

    return order;
  }

  async getAllUserOrders(user_id: number) {
    const orders = await this.orderRepository.findAll({ where: { user_id } });

    return orders;
  }
}
