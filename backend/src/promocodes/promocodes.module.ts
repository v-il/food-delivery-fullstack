import { Module } from '@nestjs/common';
import { PromocodesController } from './promocodes.controller';
import { PromocodesService } from './promocodes.service';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { Promocode } from './promocodes.model';

@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService],
  imports: [
    SequelizeModule.forFeature([Promocode])
  ]
})
export class PromocodesModule {}
