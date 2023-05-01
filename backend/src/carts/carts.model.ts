import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "src/cart-items/cart-items.model";
import { Item } from "src/items/items.model";

interface CartCreationAttributes {
    string_id: string;
}

@Table({ tableName: "carts" })
export class Cart extends Model<Cart, CartCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID корзины' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: '0asd9jv0ajSClz072', description: 'Строковый случайный ID' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    string_id: string;

    @ApiProperty({ example: 'false', description: 'Оформлен ли заказ по корзине' })
    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    done: boolean;

    @BelongsToMany(() => Item, () => CartItem)
    items: CartItem[]
}