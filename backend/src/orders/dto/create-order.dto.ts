import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  user_id?: number;
  @ApiProperty()
  readonly tg_id?: number;
  @ApiProperty()
  readonly done?: boolean;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly address: string;
  @ApiProperty()
  readonly delivery_time: string;
  @ApiProperty()
  readonly comment?: string;
  @ApiProperty()
  promocode?: string;
  @ApiProperty()
  readonly payment_link: string;
  @ApiProperty()
  readonly paid?: boolean;
  @ApiProperty()
  cart_id: string;
}
