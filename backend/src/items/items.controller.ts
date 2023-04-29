import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService) { }

    @ApiOperation({summary: 'Заполнить базу товаров'})
    @Get('/init')
    init() {
        return this.itemService.init();
    }

}
