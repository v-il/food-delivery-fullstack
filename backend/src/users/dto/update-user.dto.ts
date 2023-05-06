import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({example: 123123})
    readonly tg_id: number;
    @ApiProperty({example: "Иван"})
    readonly rl_name?: string;
    @ApiProperty({example: "Тест"})
    readonly address?: string;
    @ApiProperty({example: "+71234567890"})
    readonly phone?: string;
    @ApiProperty({example: "1970-01-01"})
    readonly birthday?: string;
}