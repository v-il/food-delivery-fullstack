import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import * as randomstring from 'randomstring';
import { NotFoundError } from 'rxjs';

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

  async getAddress(address: string) {
    const url = 'https://cleaner.dadata.ru/api/v1/clean/address';
    const token = '78eddbe63c7dfafae7da7a37db441147cb66394e';
    const secret = 'f4fdd8ce53dad2ff71e333efc24b0982d24ea425';

    const response = await fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token,
        "X-Secret": secret
      },
      body: JSON.stringify([`г Новосибирск ${address}`])
    }).then(res => res.json());

    console.log(response)
    if (response.length > 0) {
      return {address: response[0].result};
    } else {
      throw new NotFoundException();
    }
  }
}
