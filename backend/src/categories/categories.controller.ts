import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {}

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.categoryService.getOne(id);
    }

}
