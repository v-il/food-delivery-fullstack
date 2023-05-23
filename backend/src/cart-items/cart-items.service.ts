import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-items.model';
import { CartsService } from 'src/carts/carts.service';
import { ItemsService } from 'src/items/items.service';
import { ItemsExtrafields } from 'src/items/items-extrafields.model';

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
      where: { item_id, cart_id: cart.id, size},
    });

    const item = (await this.itemService.getOne(item_id)).dataValues;

    console.log(`\n\n\n\n\n\n\n\nsize ${size}\n\n\n\n\n\n\n\n`);
    console.log(`\n\n\n\n\n\n\n\ncart ${cart.id}\n\n\n\n\n\n\n\n`);
    console.log(isCartItemExist);

    const sizes = (
      await ItemsExtrafields.findOne({ where: { item_id, type: size } })
    ).dataValues;
    console.log(`\n\n\n\n\n\n\n\nsizes ${sizes.price}\n\n\n\n\n\n\n\n`);

    try {
      if (isCartItemExist === null) {
        const cartItem = await this.cartItemRepository.create({
          size,
          item_id,
          cart_id: cart.id,
          tg_front_size: sizes.tg_frontend_type,
          total_price: sizes.price,
        });
        if (!cartItem) {
          return false;
        }
      }
  
    } catch (e) {
      console.log(e)
    }

    if (isCartItemExist !== null) {
        await isCartItemExist.update({
          number: isCartItemExist.number + 1,
          size,
          tg_front_size: sizes.tg_frontend_type,
          total_price: sizes.price * (isCartItemExist.number + 1),
        });
        await isCartItemExist.save();
        return true;
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

      const needed = item.sizes.filter(
        (item) =>
          item.dataValues.price ===
          cartItem.dataValues.total_price / cartItem.dataValues.number,
      );

      cartItem.number = cartItem.dataValues.number - 1;
      cartItem.total_price = needed[0].price * cartItem.number;


    await cartItem.save();

    return true;
  }
}
