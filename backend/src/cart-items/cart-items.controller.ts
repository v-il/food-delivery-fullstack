import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { DecrementItemDto } from './dto/decrement-cart-item.dto';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Операции с товарами в корзине')
@Controller('cart-items')
export class CartItemsController {
  constructor(private cartItemService: CartItemsService) {}

  @ApiOperation({ summary: 'Telegram | Добавление товара в корзину' })
  @Post('/add')
  @ApiResponse({status: 200, type: Boolean})
  addItemToCart(@Body() dto: CreateCartItemDto) {
    console.log('\n\n\n\n\n\n');
    console.log(dto);
    console.log('\n\n\n\n\n\n');
    return this.cartItemService.addToCart(dto.item_id, dto.cart_id, dto.size);
  }

  @ApiOperation({ summary: 'Telegram | Уменьшение числа товара в корзине' })
  @ApiResponse({status: 200, type: Boolean})
  @ApiNotFoundResponse({description: 'Нечего удалять'})
  @Post('/decrement')
  decrementItem(@Body() dto: DecrementItemDto) {
    return this.cartItemService.decrementNumber(dto.cart_item_id);
  }
}
