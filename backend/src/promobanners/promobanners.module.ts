import { Module } from '@nestjs/common';
import { PromobannersController } from './promobanners.controller';
import { PromobannersService } from './promobanners.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Promobanner } from './promobanners.model';

@Module({
  controllers: [PromobannersController],
  providers: [PromobannersService],
  imports: [
    SequelizeModule.forFeature([Promobanner])
  ]
})
export class PromobannersModule {}
