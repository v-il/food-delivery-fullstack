import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category) { };

    async init() {
        const categories = await this.categoryRepository.findAll();
        if (categories.length > 0) {
            throw new ConflictException('Not need');
        }

        await this.categoryRepository.bulkCreate([
            { name: 'pizza' },
            { name: 'burgers' },
            { name: 'snacks' },
            { name: 'desserts' },
            { name: 'drinks' },
            { name: 'combo' }
        ])

        return true;
    }

    async create(dto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(dto);
        return category;
    }

    async getAll() {
        const categories = await this.categoryRepository.findAll();
        return categories;
    }

    async getOne(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        return category;
    }
}
