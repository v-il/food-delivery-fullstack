import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from 'src/carts/carts.model';
import { Item } from 'src/items/items.model';
import { Promocode } from 'src/promocodes/promocodes.model';
import { User } from 'src/users/users.model';

interface OrderItemCreationAttributes {
  user_id?: number;
  done?: boolean;
  name: string;
  address: string;
  delivery_time: string;
  comment?: string;
  promocode_id?: number;
  payment_link: string;
  paid?: boolean;
  cart_id: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderItemCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Order ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @ApiProperty({
    example: 1,
    description: 'ID пользователя, который заказывает',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  user_id: number;

  @ApiProperty({ example: true, description: 'Завершен ли заказ' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  done: boolean;

  @ApiProperty({ example: 'Иван', description: 'Имя заказывающего' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Какой-то-Город, ул. Какая-то, д 2',
    description: 'Адрес доставки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: 'Ближайшее время',
    description: 'Предпочтительное время доставки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_time: string;

  @ApiProperty({
    example: 'Домофон не работает',
    description: 'Комментарий к заказу',
  })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @BelongsTo(() => Promocode)
  promocode: Promocode;

  @ForeignKey(() => Promocode)
  @ApiProperty({ example: 1, description: 'ID промокода' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  promocode_id: number;

  @ApiProperty({ example: 'a8d7fuiaokjsd', description: 'Платежная ссылка' })
  @Column({
    type: DataType.STRING,
  })
  payment_link: string;

  @ApiProperty({ example: true, description: 'Оплачен ли заказ' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  paid: boolean;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ForeignKey(() => Cart)
  @ApiProperty({ example: 1, description: 'ID корзины' })
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;
}
