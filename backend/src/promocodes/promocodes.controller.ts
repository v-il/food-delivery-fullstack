import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { DeletePromocodeDto } from './dto/delete-promocode.dto';
import { Promocode } from './promocodes.model';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Промокоды')
@Controller('promocodes')
export class PromocodesController {
    constructor(private promocodeService: PromocodesService) { };

    @ApiOperation({ summary: 'Добавление промокода' })
    @ApiResponse({ status: 200, type: Promocode })
    @ApiBadRequestResponse({ status: 400, description: 'Не была получена ссылка на изображение' })
    @Post()
    create(@Body() dto: CreatePromocodeDto) {
        this.promocodeService.create(dto);
    }

    @ApiOperation({ summary: 'Получение всех промокодов' })
    @ApiResponse({ status: 200, type: [Promocode] })
    @Get()
    getAll() {
        this.promocodeService.getAll();
    }

    @ApiOperation({ summary: 'Получение промокода по id' })
    @ApiResponse({ status: 200, type: Promocode })
    @ApiNotFoundResponse({ status: 404, description: 'Не найден' })
    @Get("/:id")
    getOne(@Param("id") id: number) {
        this.promocodeService.getOne(id);
    }

    @ApiTags('Telegram')
    @ApiOperation({ summary: 'Проверка валидности промокода' })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiNotFoundResponse({ status: 404, description: 'Не найден' })
    @Get('/:code')
    checkTheCode(@Param('code') code: string) {
        return this.promocodeService.checkTheCode(code);
    }

    @ApiOperation({ summary: 'Удаление промокода по id' })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiNotFoundResponse({ status: 404, description: 'Не найден' })
    @Delete()
    delete(@Body() dto: DeletePromocodeDto) {
        this.promocodeService.delete(dto.id);
    }

}
