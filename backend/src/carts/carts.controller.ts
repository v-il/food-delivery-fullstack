import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Cart } from './carts.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { boolean } from 'yargs';

@ApiTags('Корзина')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { };


    @ApiOperation({ summary: 'Telegram | Создание корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @Post()
    create(@Body() dto: CreateCartDto) {
        console.log(dto)
        if (dto && dto.tg_uid) {
            return this.cartService.createTg(dto.tg_uid)
        } 
        return this.cartService.create();
    }

    @ApiOperation({ summary: 'Web only Получение корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @ApiNotFoundResponse({ description: 'Корзина не найдена' })
    @Get('/:string_id')
    get(@Param('string_id') string_id: string) {
        return this.cartService.get(string_id);
    }

    @ApiOperation({ summary: 'Telegram only Получение корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @ApiNotFoundResponse({ description: 'Корзина не найдена' })
    @Get('/tg/:tg_uid')
    getTg(@Param('tg_uid') tg_uid: number) {
        console.log(tg_uid)
        return this.cartService.getTg(tg_uid);
    }
}
