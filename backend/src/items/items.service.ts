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
                name: 'Пепперони фреш',
                description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
                image_url: 'https://dodopizza-a.akamaihd.net/static/Img/Products/27c9bbd0af3a4d1d84a086d9c2f1656d_292x292.webp',
                different_sizes: true,
                price: null,
                category_id: 1   
            },
            {
                name: 'Бургер-пицца',
                description: 'Ветчина, маринованные огурчики, томаты, красный лук, чеснок, соус бургер, моцарелла, фирменный томатный соус',
                image_url: 'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
                different_sizes: true,
                price: null,
                category_id: 1   
            },
            {
                name: 'Мясная',
                description: 'Цыпленок, ветчина, пикантная пепперони, острая чоризо, моцарелла, фирменный томатный соус',
                image_url: 'https://dodopizza-a.akamaihd.net/static/Img/Products/18dbb12240b041a191c9dc73c9c1f4ef_292x292.webp',
                different_sizes: true,
                price: null,
                category_id: 1   
            },
            {
                name: 'Рогалики с ветчиной',
                description: 'Рогалики из нежного теста с чесночным соусом, ветчиной, сыром моцарелла. Сервируются с соусом на выбор',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/dede7359569c8ad6d5ae1e60890652b5.webp',
                different_sizes: true,
                price: null,
                category_id: 3   
            },
            {
                name: 'Пончик с глазурью',
                description: 'Ярко-розовый пончик без начинки, покрытый ароматной клубничной глазурью.',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/379af5878086d7d31367c1e1fba59cdc.webp',
                different_sizes: true,
                price: null,
                category_id: 4   
            },
            {
                name: 'Тирамису',
                description: 'Легендарный вкус воплощен в нежном торте с сыром Маскарпоне и украшен какао посыпкой.',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/a5654d3fc03e5b6ba19a73e5a57a0148.webp',
                different_sizes: true,
                price: null,
                category_id: 4   
            },

            {
                name: 'Тархун',
                description: '  ',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/2e33869fb1e8e971875715cb7b5870ad.webp',
                different_sizes: true,
                price: null,
                category_id: 5
            },
            {
                name: 'Дюшес',
                description: '  ',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/1ad8481ee47a0de3e92d67096bed6c8e.webp',
                different_sizes: true,
                price: null,
                category_id: 5
            },
            {
                name: 'Комбо из четырех пицц',
                description: '4 пиццы',
                image_url: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/2baa4bb052e20635517cb0633fd09a0a.webp',
                different_sizes: true,
                price: null,
                category_id: 6
            }
        ])

        await ItemsExtrafields.bulkCreate([
            {
                type: 'small',
                tg_frontend_type: 'маленькая',
                in_stock: true,
                price: 499,
                item_id: 1
            },
            {
                type: 'medium',
                tg_frontend_type: 'средняя',
                in_stock: true,
                price: 749,
                item_id: 1
            },
            {
                type: 'big',
                tg_frontend_type: 'большая',
                in_stock: true,
                price: 879,
                item_id: 1
            },

            {
                type: 'small',
                tg_frontend_type: 'маленькая',
                in_stock: true,
                price: 289,
                item_id: 2
            },
            {
                type: 'medium',
                tg_frontend_type: 'средняя',
                in_stock: true,
                price: 539,
                item_id: 2
            },
            {
                type: 'big',
                tg_frontend_type: 'большая',
                in_stock: true,
                price: 669,
                item_id: 2
            },

            {
                type: 'small',
                tg_frontend_type: 'маленькая',
                in_stock: true,
                price: 439,
                item_id: 3
            },
            {
                type: 'medium',
                tg_frontend_type: 'средняя',
                in_stock: true,
                price: 649,
                item_id: 3
            },
            {
                type: 'big',
                tg_frontend_type: 'большая',
                in_stock: true,
                price: 849,
                item_id: 3
            },

            {
                type: 'small',
                tg_frontend_type: 'маленькая',
                in_stock: true,
                price: 499,
                item_id: 4
            },
            {
                type: 'medium',
                tg_frontend_type: 'средняя',
                in_stock: true,
                price: 749,
                item_id: 4
            },
            {
                type: 'big',
                tg_frontend_type: 'большая',
                in_stock: true,
                price: 879,
                item_id: 4
            },
            {
                type: 'small',
                tg_frontend_type: 'маленькие',
                in_stock: true,
                price: 289,
                item_id: 5
            },
            {
                type: 'big',
                tg_frontend_type: 'большие',
                in_stock: true,
                price: 369,
                item_id: 5
            },

            {
                type: 'small',
                tg_frontend_type: 'маленький',
                in_stock: true,
                price: 99,
                item_id: 6
            },
            {
                type: 'big',
                tg_frontend_type: 'большой',
                in_stock: true,
                price: 159,
                item_id: 6
            },

            
            {
                type: 'small',
                tg_frontend_type: 'порция',
                in_stock: true,
                price: 230,
                item_id: 7
            },
            {
                type: 'big',
                tg_frontend_type: 'торт',
                in_stock: true,
                price: 1260,
                item_id: 7
            },
            {
                type: '0.5',
                tg_frontend_type: '0.5 л',
                in_stock: true,
                price: 99,
                item_id: 8
            },
            {
                type: '2',
                tg_frontend_type: '2 л',
                in_stock: true,
                price: 199,
                item_id: 9
            },

            {
                type: '0.5',
                tg_frontend_type: '0.5 л',
                in_stock: true,
                price: 99,
                item_id: 9
            },
            {
                type: 'small',
                tg_frontend_type: 'маленькие',
                in_stock: true,
                price: 1290,
                item_id: 10
            },
            {
                type: 'big',
                tg_frontend_type: 'большие',
                in_stock: true,
                price: 2650,
                item_id: 10
            },
        ])

        return true;
    }

    async getOne(item_id: number) {
        const item = await this.itemRepository.findOne({where: {id: item_id}, include: ItemsExtrafields});

        return item;
    }
}
