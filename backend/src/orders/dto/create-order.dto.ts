import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  readonly user_id?: number;
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
  readonly promocode_id?: number;
  @ApiProperty()
  readonly payment_link: string;
  @ApiProperty()
  readonly paid?: boolean;
  @ApiProperty()
  readonly cart_id: number;
}
