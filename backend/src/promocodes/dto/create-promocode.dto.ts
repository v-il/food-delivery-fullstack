import { ApiProperty } from "@nestjs/swagger";

export class CreatePromocodeDto {
    @ApiProperty()
    readonly code: string;
    @ApiProperty()
    readonly end_date: string;
}