import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import * as randomstring from 'randomstring';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/users.model';
import { Cart } from 'src/carts/carts.model';
import { Promocode } from 'src/promocodes/promocodes.model';
import { CartItem } from 'src/cart-items/cart-items.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async addOrder(dto: CreateOrderDto) {
    if (dto.tg_id) {
      const user = (await User.findOne({ where: { tg_id: dto.tg_id } }))
        .dataValues;
      dto.user_id = user.id;
    }

    const promocode_id = dto.promocode
      ? await Promocode.findOne({ where: { code: dto.promocode } })
      : null;

    const cart = await Cart.findOne({ where: { string_id: dto.cart_id } });
    const itemsInCart = await CartItem.findAll({
      where: { cart_id: cart.dataValues.id },
    });

    let total = 0;

    itemsInCart.map((item) => (total += item.total_price));

    if (promocode_id && promocode_id.dataValues.minTotal < total) {
      total -= total * (promocode_id.dataValues.discount / 100);
    }

    await Cart.update({ done: true }, { where: { id: cart.dataValues.id } });
    const order = await this.orderRepository.create({
      ...dto,
      cart_id: cart.dataValues.id,
      promocode_id: promocode_id ? promocode_id.dataValues.id : null,
      payment_link: randomstring.generate(12),
      total,
    });

    return order;
  }

  async getAllUserOrders(user_id: number) {
    const orders = await this.orderRepository.findAll({ where: { user_id } });

    return orders;
  }

  async getAllUserOrdersTg(tg_id: number) {
    const user = await User.findOne({ where: { tg_id } });
    const orders = await this.orderRepository.findAll({
      where: { user_id: user.dataValues.id },
    });

    return orders;
  }

  async getAddress(address: string) {
    const url = 'https://cleaner.dadata.ru/api/v1/clean/address';
    const token = '78eddbe63c7dfafae7da7a37db441147cb66394e';
    const secret = 'f4fdd8ce53dad2ff71e333efc24b0982d24ea425';

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
        'X-Secret': secret,
      },
      body: JSON.stringify([`г Новосибирск ${address}`]),
    }).then((res) => res.json());

    console.log(response);
    if (response.length > 0) {
      return { address: response[0].result };
    } else {
      throw new NotFoundException();
    }
  }
}
