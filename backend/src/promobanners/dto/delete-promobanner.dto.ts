import { ApiProperty } from "@nestjs/swagger";

export class DeletePromobannerDto {
    @ApiProperty()
    readonly id: number
}