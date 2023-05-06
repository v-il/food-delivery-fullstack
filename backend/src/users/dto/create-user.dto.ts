import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 1234567890})
  readonly tg_id: number;
  @ApiProperty({example: 'example'})
  readonly tg_name: string;
  @ApiProperty({example: 'Иван'})
  readonly rl_name: string;
  @ApiProperty({example: 'Новосибирск, ул Улица, д 1, кв 1'})
  readonly address: string;
  @ApiProperty({example: '+71231234567'})
  readonly phone: string;
  @ApiProperty({example: '1970-01-01'})
  readonly birthday: string;
}
