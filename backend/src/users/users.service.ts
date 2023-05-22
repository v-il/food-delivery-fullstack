import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginLink } from './loginLinks.model';
import * as randomstring from 'randomstring';
import { Token } from './tokens.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(LoginLink) private loginLinkRepository: typeof LoginLink,
    @InjectModel(Token) private tokenRepository: typeof Token
  ) {}

  async auth(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        tg_id: dto.tg_id,
      },
    });
    if (!user) {
      return this.create(dto);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async update(dto: UpdateUserDto) {
    const user = (
      await this.userRepository.findOne({ where: { tg_id: dto.tg_id } })
    ).update(dto);
    return user;
  }

  async telegramLogin(tgId: string | number) {
    const code = randomstring.generate(12);
    
    const link = await this.loginLinkRepository.create({
      link: code,
      tg_id: Number(tgId)
    })

    return {link: `${process.env.FRONTEND_URL}/login?code=${code}`};
  };

  async returnLoginProperties(code: string) {
    const link = (await this.loginLinkRepository.findOne({where: {link: code}}));
    link && await link.update({used: true});

    if (!link) {
      throw new BadRequestException();
    }

    const tokenString = randomstring.generate(12);

    const token = await this.tokenRepository.create({
      token: tokenString,
      tg_id: link.dataValues.tg_id
    })

    await link.destroy();

    return token.token;
  }

  async getInfo(token: string) {
    const tokenFromDb = (await this.tokenRepository.findOne({where: {token: token}}));
    if (tokenFromDb) {
      
      const user = await this.userRepository.findOne({where: {tg_id: tokenFromDb.dataValues.tg_id}});
      return user.dataValues;
    }

    throw new UnauthorizedException();
  }
}
