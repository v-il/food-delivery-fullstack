import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
