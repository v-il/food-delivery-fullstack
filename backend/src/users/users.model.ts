import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "src/cart-items/cart-items.model";
import { Item } from "src/items/items.model";

interface UserCreationAttributes {
    tg_name: string;
    rl_name: string;
    address: string;
    phone: string;
    birthday: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({ example: 2, description: 'ID пользователя' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'example', description: 'Telegram username' })
    @Column({
        type: DataType.STRING,
        unique: true,

    })
    tg_name: string;


    @ApiProperty({ example: 'Иван', description: 'Реальное имя пользователя' })
    @Column({
        type: DataType.STRING,
        defaultValue: null
    })
    rl_name: string;

    @ApiProperty({ example: 'Новосибирск, ул Улица, д 1, кв 1', description: 'Адрес доставки' })
    @Column({
        type: DataType.STRING,
        defaultValue: null
    })
    address: string;

    @ApiProperty({ example: '+71231234567', description: 'Номер телефона для связи' })
    @Column({
        type: DataType.STRING,
        defaultValue: null
    })
    phone: string;


    @ApiProperty({ example: '1970-01-01', description: 'День рождения' })
    @Column({
        type: DataType.DATEONLY,
        defaultValue: null
    })
    birthday: string;

    


}