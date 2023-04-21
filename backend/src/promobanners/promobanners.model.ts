import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PromobannerCreationAttributes {
    image_src: string
}

@Table({ tableName: "promobanners" })
export class Promobanner extends Model<Promobanner, PromobannerCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID промо-баннера на главной странице' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'https://www.soyuz.ru/public/uploads/files/2/7470473/20210729144632784db64e18.jpg', description: 'Ссылка на изображение с баннером' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_src: string;




}