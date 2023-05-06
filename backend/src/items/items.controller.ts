import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Item } from './items.model';
import { ItemsService } from './items.service';
import { ItemsExtrafields } from './items-extrafields.model';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService) { }

    @ApiOperation({summary: 'Заполнить базу товаров'})
    @Get('/init')
    init() {
        return this.itemService.init();
    }

    @ApiOperation({summary: 'Получить один'})
    @ApiOkResponse({type: Item})
    @Get('getOne/:id')
    getOne(@Param('id') id: number){
        return this.itemService.getOne(id);
    }

}
