import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "src/cart-items/cart-items.model";
import { Item } from "src/items/items.model";
import { Order } from "src/orders/orders.model";

interface LoginLinkCreationAttribute {
    link: string;
    tg_id: number;
    used: boolean;
}

@Table({ tableName: "login_links" })
export class LoginLink extends Model<LoginLink, LoginLinkCreationAttribute> {
    @ApiProperty({ example: 2, description: 'ID ссылки' })
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
    link: number;

    @Column({
        type: DataType.BIGINT
    })
    tg_id: number;

    @ApiProperty({ example: false, description: 'Использована ли ссылка' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false

    })
    used: boolean;
    


}