import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreatePromobannerDto } from './dto/create-promobanner.dto';
import { PromobannersService } from './promobanners.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Promobanner } from './promobanners.model';
import { DeletePromobannerDto } from './dto/delete-promobanner.dto';

@Controller('promobanners')
@ApiTags('Промо-баннеры')
export class PromobannersController {

    constructor(private promobannerService: PromobannersService) { }

    @ApiOperation({ summary: 'Добавление промо-баннера' })
    @ApiResponse({ status: 200, type: Promobanner })
    @ApiBadRequestResponse({ status: 400, description: 'Не была получена ссылка на изображение' })
    @Post()
    create(@Body() promobannerDto: CreatePromobannerDto) {
        return this.promobannerService.create(promobannerDto);
    }

    @ApiOperation({ summary: 'Получение всех промо-баннеров' })
    @ApiResponse({ status: 200, type: [Promobanner] })
    @Get()
    getAll() {
        return this.promobannerService.getAll();
    }

    @ApiOperation({ summary: 'Получение одного промо-баннера' })
    @ApiResponse({ status: 200, type: Promobanner })
    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.promobannerService.getOne(id);
    }

    @Delete()
    delete(@Body() promobannerDto: DeletePromobannerDto) {
        return this.promobannerService.delete(promobannerDto.id);
    }

}
