import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './items.model';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [
    SequelizeModule.forFeature([Item])
  ]
})
export class ItemsModule {}
