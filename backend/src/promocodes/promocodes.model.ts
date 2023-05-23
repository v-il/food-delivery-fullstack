import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PromocodeCreationAttributes {
    code: string;
    end_date: string;
    minTotal: number;
    discount: number;
}

@Table({ tableName: "promocodes" })
export class Promocode extends Model<Promocode, PromocodeCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID промокода' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'PROMO1', description: 'Сам промокод' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    code: string;

    @ApiProperty({ example: 1500, description: 'Минимальная сумма заказа' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    minTotal: number;

    @ApiProperty({ example: 10, description: 'Скидка (в процетах)' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    discount: number;

    @ApiProperty({ example: '1970-01-01', description: 'Дата окончания действия промокода' })
    @Column({
        type: DataType.DATEONLY
    })
    end_date: string;
}