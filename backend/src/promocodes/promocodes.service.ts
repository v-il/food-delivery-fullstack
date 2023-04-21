import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Promocode } from './promocodes.model';
import { CreatePromocodeDto } from './dto/create-promocode.dto';

@Injectable()
export class PromocodesService {
    constructor(@InjectModel(Promocode) private promocodeRepository: typeof Promocode) { }

    async create(dto: CreatePromocodeDto) {
        const promocode = await this.promocodeRepository.create(dto);
        return promocode;
    }

    async getAll() {
        const promocodes = await this.promocodeRepository.findAll();
        return promocodes;
    }

    async getOne(id: number) {
        const promocode = await this.promocodeRepository.findOne({
            where: {
                id
            }
        });
        if (promocode) {
            return promocode;
        }

        throw new NotFoundException();
    }

    async delete(id: number) {
        const promocode = await this.promocodeRepository.findOne({where: {
            id
        }});

        if (!promocode) {
            throw new NotFoundException();
        }

        await promocode.destroy();
        return true;
    }
}