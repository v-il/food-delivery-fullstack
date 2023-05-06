import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async auth(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({where: {
        tg_id: dto.tg_id
    }});
    if (!user) {
        return this.create(dto);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
}
