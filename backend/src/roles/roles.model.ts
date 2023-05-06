import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttributes {
    name: string;
    ru_name: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttributes> {
    @ApiProperty({ example: '1', description: 'ID роли' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 'admin', description: 'Название роли на английском' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @ApiProperty({ example: 'Администратор', description: 'Название роли на русском' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    ru_name: string;
}