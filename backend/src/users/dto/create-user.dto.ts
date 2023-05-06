import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 'example'})
  readonly tg_name: string;
  @ApiProperty({example: 'Иван'})
  readonly rl_name: string;
  @ApiProperty({example: 'Новосибирск, ул Улица, д 1, кв 1'})
  readonly address: string;
  @ApiProperty({example: '+71231234567'})
  readonly phone: string;
  @ApiProperty({example: '01-01-1970'})
  readonly birthday: string;
}
