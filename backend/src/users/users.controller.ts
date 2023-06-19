import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiDefaultResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from 'src/_helpers/api.guard';
import { WrongApiKeyResponse } from 'src/_helpers/customTypes';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginLink } from './loginLinks.model';
import { AuthGuard } from './auth.guard';

@ApiForbiddenResponse({status: 403, type: WrongApiKeyResponse})
@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Telegram | Аутентификация' })
  @ApiOkResponse({ type: User })
  @Post('/auth')
  @UseGuards(ApiGuard)
  auth(@Body() dto: CreateUserDto) {
    return this.userService.auth(dto);
  }

  @ApiOperation({ summary: 'Telegram | Изменение данных пользователя' })
  @ApiOkResponse({ type: User })
  @Post('/update')
  @UseGuards(ApiGuard)
  update(@Body() dto: UpdateUserDto) {
    return this.userService.update(dto);
  }

  @ApiOperation({summary: 'Telegram Auth | Вход на сайт через телеграм'})
  @ApiOkResponse({type: LoginLink})
  @Get('/tg-auth/:tgId')
  loginWithTelegram(@Param('tgId') tgId: string | number ) {
    return this.userService.telegramLogin(tgId);
  }

  @Get('/token/:code') 
  async getToken(@Param('code') code: string, @Res() res) {
    const token = await this.userService.returnLoginProperties(code);
    res.cookie('authToken', token);
    res.json({token})
  }

  @Get('/getInfo/')
  @UseGuards(AuthGuard)
  getInfo(@Req() req) {
    const token = req.cookies["authToken"];
    return this.userService.getInfo(token);
  }
}


