import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from './items.model';

interface ItemCreationAttributes {
  type: string;
  tg_frontend_type: string;
  in_stock: boolean;
  price: number;
  item_id: number;
}

@Table({ tableName: 'items_extrafields' })
export class ItemsExtrafields extends Model<
  ItemsExtrafields,
  ItemCreationAttributes
> {
  @ApiProperty({ example: 1, description: 'ID товара' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'small', description: 'Тип товара' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: 'маленький',
    description: 'Тип товара для сайта и телеграма',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tg_frontend_type: string;

  @ApiProperty({ example: true, description: 'Наличие' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  in_stock: boolean;

  @ApiProperty({ example: 459, description: 'Цена' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  price: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => Item)
  @ApiProperty({ example: 1, description: 'К какому товару относится' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  item_id: number;
}
