import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "src/cart-items/cart-items.model";
import { Item } from "src/items/items.model";
import { Order } from "src/orders/orders.model";

interface TokenCreationAttribute {
    token: string;
    tg_id: number;
}

@Table({ tableName: "tokens" })
export class Token extends Model<Token, TokenCreationAttribute> {
    @ApiProperty({ example: 2, description: 'ID токена' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'ksja0i1GQ1', description: 'Ссылка' })
    @Column({
        type: DataType.STRING,
        unique: true,

    })
    token: number;

    @Column({
        type: DataType.BIGINT
    })
    tg_id: number;
}