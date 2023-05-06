import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import * as randomstring from 'randomstring';
import { CartItem } from 'src/cart-items/cart-items.model';
import { Item } from 'src/items/items.model';

@Injectable()
export class CartsService {

    constructor(@InjectModel(Cart) private cartRepository: typeof Cart) { }

    async create() {
        const cart = await this.cartRepository.create({
            string_id: randomstring.generate(12)
        })

        return cart;
    }

    async get(string_id: string) {
        const cart = await this.cartRepository.findOne({ where: { string_id }, include: {model: Item} });

        if (!cart) {
            throw new NotFoundException();
        }

        return cart;
    }

}
