import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty()
  readonly cart_id: string;
  @ApiProperty()
  readonly item_id: number;
  @ApiProperty()
  readonly size: string;
}
