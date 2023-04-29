import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiConflictResponse } from '@nestjs/swagger';
import { Category } from './categories.model';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {}


    @ApiOperation({summary: 'Создание категорий в таблице (запускать один раз)'})
    @ApiResponse({status: 200, type: Boolean})
    @ApiConflictResponse({description: 'Категории уже существуют'})
    @Get('/init')
    initTable() {
        return this.categoryService.init();
    }

    @ApiOperation({summary: 'Создание категории'})
    @ApiResponse({status: 200, type: Category})
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @ApiOperation({summary: 'Получение списка категорий'})
    @ApiResponse({status: 200, type: [Category]})
    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @ApiOperation({summary: 'Получение категории по ID'})
    @ApiResponse({status: 200, type: Category})
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.categoryService.getOne(id);
    }

}
