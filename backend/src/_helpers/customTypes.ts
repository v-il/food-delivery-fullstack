import { ApiProperty } from '@nestjs/swagger';


export class WrongApiKeyResponse {
  @ApiProperty({ example: 403 })
  readonly statusCode: number;
  @ApiProperty({ example: 'Wrong API key' })
  readonly message: string;
  @ApiProperty({ example: 'Forbidden' })
  readonly error: string;
}
