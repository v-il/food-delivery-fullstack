import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cart-items.model';
import { CartsModule } from 'src/carts/carts.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
  imports: [SequelizeModule.forFeature([CartItem]), CartsModule, ItemsModule]
})
export class CartItemsModule {}
