import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Item } from "src/items/items.model";

interface CategoryCreationAttributes {
    name: string
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID категории' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'Пицца', description: 'Имя категории' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => Item)
    items: Item[];
}