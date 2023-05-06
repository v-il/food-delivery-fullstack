import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({summary: 'Telegram | Аутентификация'})
  @ApiOkResponse({type: User})
  @Post('/auth')
  auth(@Body() dto: CreateUserDto) {
    return this.userService.auth(dto);
  }
}
