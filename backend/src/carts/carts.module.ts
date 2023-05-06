import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Cart } from './carts.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [SequelizeModule.forFeature([Cart])],
  exports: [CartsService]
})
export class CartsModule {}
