import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Promobanner } from './promobanners.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePromobannerDto } from './dto/create-promobanner.dto';
import { DeletePromobannerDto } from './dto/delete-promobanner.dto';

@Injectable()
export class PromobannersService {

    constructor(@InjectModel(Promobanner) private promobannerRespository: typeof Promobanner) { };

    async create(dto: CreatePromobannerDto) {
        if (!dto.image_src) {
            throw new BadRequestException('provide image_src')
        }
        
        const promobanner = await this.promobannerRespository.create(dto);
        return promobanner;
    }

    async getOne(id: number) {
        const promobanner = await this.promobannerRespository.findOne({
            where: {
                id
            }
        });
        if (promobanner) {
            return promobanner;
        }

        throw new NotFoundException();
    }

    async getAll() {
        const promobanners = await this.promobannerRespository.findAll();
        return promobanners;
    }

    async delete(id: number) {
        const promobanner = await this.promobannerRespository.findOne({ where: { id } });

        if (!promobanner) {
            throw new NotFoundException();
        }

        await promobanner.destroy();

        return true;
    }

}
