import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
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
    async create(@Body() dto: CreateCartDto, @Res() res, @Req() req) {
        if (req.cookies) {
            const cartId = req.cookies["cart"];
            console.log(cartId);

            if (cartId) {
                const cart = await this.cartService.get(cartId);
                return res.json(cart);
            }
        }
        if (dto && dto.tg_uid) {
            return this.cartService.createTg(dto.tg_uid)
        } 
        const cart = await this.cartService.create();
        res.cookie('cart', cart.string_id);
        res.json(cart);
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
    getTg(@Param('tg_uid') tg_uid: number, @Res() res: Response) {
        return this.cartService.getTg(tg_uid);
    }
}
