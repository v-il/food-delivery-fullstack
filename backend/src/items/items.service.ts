import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './items.model';
import { ItemsExtrafields } from './items-extrafields.model';

@Injectable()
export class ItemsService {

    constructor(@InjectModel(Item) private itemRepository: typeof Item) { }

    async init() {
        const items = await this.itemRepository.findAll();

        if (items.length > 0) {
            throw new ConflictException();
        }

        await this.itemRepository.bulkCreate([
            {
                name: 'Сырный цыпленок',
                description: 'Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок',
                image_url: 'https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_292x292.webp',
                different_sizes: true,
                price: null,
                category_id: 1   
            },
            {
                name: 'Сырный цыпленок',
                description: 'Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок',
                image_url: 'https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_292x292.webp',
                different_sizes: true,
                price: null,
                category_id: 1   
            },
            {
                name: 'Гранд',
                description: 'Сочный бифштекс из натуральной говядины, приготовленный на гриле, карамелизованная булочка с кунжутом, два ломтика сыра Чеддер, кетчуп, горчица, свежий лук и маринованные огурчики',
                image_url: 'https://vkusnoitochka.ru/resize/194x194/upload/iblock/077/mlz0jdiqppgzx8j9n00ou1mehs7qmf9c/large.png',
                different_sizes: false,
                price: 175,
                category_id: 2 
            }
        ])

        return true;
    }

    async getOne(item_id: number) {
        const item = await this.itemRepository.findOne({where: {id: item_id}, include: ItemsExtrafields});

        return item;
    }
}
