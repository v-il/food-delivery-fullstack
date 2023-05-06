import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PromobannersModule } from './promobanners/promobanners.module';
import { Promobanner } from './promobanners/promobanners.model';
import { PromocodesModule } from './promocodes/promocodes.module';
import { Promocode } from './promocodes/promocodes.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/carts.model';
import { ItemsModule } from './items/items.module';
import { Item } from './items/items.model';
import { CartItemsModule } from './cart-items/cart-items.module';
import { CartItem } from './cart-items/cart-items.model';
import { UserModule } from './users/users.module';
import { User } from './users/users.model';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/orders.model';
import { ItemsExtrafields } from './items/items-extrafields.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Promobanner,
        Promocode,
        Category,
        Role,
        Cart,
        Item,
        CartItem,
        User,
        Order,
        ItemsExtrafields
      ],
      autoLoadModels: true,
    }),
    PromobannersModule,
    PromocodesModule,
    CategoriesModule,
    RolesModule,
    CartsModule,
    ItemsModule,
    CartItemsModule,
    UserModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
