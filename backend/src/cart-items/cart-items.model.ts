import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from 'src/carts/carts.model';
import { Item } from 'src/items/items.model';

interface CartItemCreationAttributes {
  item_id: number;
  cart_id: number;
  size: string;
  number: number;
  total_price: number;
  tg_front_size: string;
}

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem, CartItemCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Cart Item ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Количество товара' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  number: number;

  @ApiProperty({ example: 'small', description: 'Размер товара' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  size: string;

  @ApiProperty({ example: 'маленькая', description: 'Размер товара для тг и веба' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tg_front_size: string;

  @ApiProperty({ example: 1099, description: 'Итоговая стоимость' })
  @Column({
    type: DataType.INTEGER,
  })
  total_price: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => Item)
  @ApiProperty({ example: 1, description: 'ID товара' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  item_id: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ForeignKey(() => Cart)
  @ApiProperty({ example: 1, description: 'ID корзины' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cart_id: number;
}
