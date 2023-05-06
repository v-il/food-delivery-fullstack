import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-items.model';
import { CartsService } from 'src/carts/carts.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItem) private cartItemRepository: typeof CartItem,
    private cartService: CartsService,
    private itemService: ItemsService,
  ) {}

  private priceSize = {
    undefined: 'price',
    null: 'price',
    small: 'small_size_price',
    medium: 'medium_size_price',
    big: 'big_size_price',
  };

  async addToCart(item_id: number, cart_id: string, size: string) {
    const cart = await this.cartService.get(cart_id);

    const isCartItemExist = await this.cartItemRepository.findOne({
      where: { item_id, cart_id: cart.id },
    });

    const item = (await this.itemService.getOne(item_id)).dataValues;

    if (isCartItemExist) {
      await isCartItemExist.update({
        number: isCartItemExist.number + 1,
        total_price: item[this.priceSize[size]] * (isCartItemExist.number + 1),
      });
      await isCartItemExist.save();
      return true;
    }

    const cartItem = await this.cartItemRepository.create({
      item_id,
      cart_id: cart.id,
      size,
      total_price: item[this.priceSize[size]],
    });

    if (!cartItem) {
      return false;
    }

    return true;
  }

  async decrementNumber(cart_item_id: number) {
    const cartItem: CartItem = await this.cartItemRepository.findOne({
      where: { id: cart_item_id },
    });

    if (!cartItem) {
      throw new NotFoundException();
    }

    const item = (await this.itemService.getOne(cartItem.dataValues.item_id))
      .dataValues;

    if (cartItem.dataValues.number === 1) {
      await cartItem.destroy();
      return true;
    }

    cartItem.number = cartItem.dataValues.number - 1;
    cartItem.total_price =
      item[this.priceSize[cartItem.dataValues.size]] * cartItem.number;

    await cartItem.save();

    return true;
  }
}
