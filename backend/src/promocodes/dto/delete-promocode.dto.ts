import { ApiProperty } from "@nestjs/swagger";

export class DeletePromocodeDto {
    @ApiProperty()
    readonly id: number
}