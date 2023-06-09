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
                const cart = (await Cart.findOne({where: {string_id: cartId}}));
                if (cart && cart.dataValues !== null ) {
                    return res.json(cart);
                }
            }
        }
        if (dto && dto.tg_uid) {
            const cart = await this.cartService.createTg(dto.tg_uid)
            return res.json(cart);
        } 
        const cart = await this.cartService.create();
        res.cookie('cart', cart.string_id);
        res.json(cart);
    }

    @ApiOperation({ summary: 'Web only Получение корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @ApiNotFoundResponse({ description: 'Корзина не найдена' })
    @Get('')
    get(@Req() req) {
        return this.cartService.get(req.cookies["cart"]);
    }

    @Get('/getbyid/:id')
    getById(@Param('id') id: number) {
        return this.cartService.getById(id);
    }

    @ApiOperation({ summary: 'Telegram only Получение корзины' })
    @ApiResponse({ status: 200, type: Cart })
    @ApiNotFoundResponse({ description: 'Корзина не найдена' })
    @Get('/tg/:tg_uid')
    async getTg(@Param('tg_uid') tg_uid: number, @Res() res) {
        const cart = await this.cartService.getTg(tg_uid)
        res.json(cart);
    }
}
