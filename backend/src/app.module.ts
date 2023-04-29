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
      models: [Promobanner, Promocode, Category, Role],
      autoLoadModels: true,
    }),
    PromobannersModule,
    PromocodesModule,
    CategoriesModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
