import { ApiExtraModels, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { CartItem } from "src/cart-items/cart-items.model";
import { Category } from "src/categories/categories.model";
import { ItemsExtrafields } from "./items-extrafields.model";

interface ItemCreationAttributes {
    name: string;
    description: string;
    image_url: string;
    different_sizes: boolean;
    small_size_in_stock: boolean;
    medium_size_in_stock: boolean;
    big_size_in_stock: boolean;
    small_size_price: number;
    medium_size_price: number;
    big_size_price: number;
    price: number;
    category_id: number;
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID товара' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'Пепперони', description: 'Название товара' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @ApiProperty({ example: 'Американская классика с пикантной пепперони, Моцареллой и фирменным томатным соусом', description: 'Описание товаров' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @ApiProperty({ example: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/Pepperoni-traditional.webp', description: 'Ссылка на картинку' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_url: string;

    @ApiProperty({example: [{"id": 1,
    "type": "small",
    "tg_frontend_type": "маленькая",
    "in_stock": true,
    "price": 459,
    "item_id": 1,
    "createdAt": "2023-05-06T16:28:47.622Z",
    "updatedAt": "2023-05-06T16:28:47.622Z"}], description: 'Допполя'})
    @HasMany(() => ItemsExtrafields)
    sizes: ItemsExtrafields[];
    
    @ApiProperty({ example: true, description: 'Продается ли товар в нескольких вариантах размера' })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    different_sizes: boolean;

    @ApiProperty({ example: 499, description: 'Цена товара, если у него нет деления на размер' })
    @Column({
        type: DataType.INTEGER,
    })
    price: number;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Category)
    @ApiProperty({ example: 1, description: 'Категория товара (id)' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    category_id: number;

    @HasMany(() => CartItem)
    cartItem: CartItem[]

    
}