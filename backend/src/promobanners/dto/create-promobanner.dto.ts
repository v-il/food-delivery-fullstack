import { ApiProperty } from "@nestjs/swagger";

export class CreatePromobannerDto {
    @ApiProperty()
    readonly image_src: string
}