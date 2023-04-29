import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Cart } from './carts.model';

@ApiTags('Корзина')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { };


    @ApiTags('Telegram')
    @ApiOperation({ summary: 'Создание корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @Post()
    create() {
        return this.cartService.create();
    }

    @ApiTags('Telegram')
    @ApiOperation({ summary: 'Получение корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @ApiNotFoundResponse({ description: 'Корзина не найдена' })
    @Get('/:string_id')
    get(@Param('string_id') string_id: string) {
        return this.cartService.get(string_id);
    }
}
