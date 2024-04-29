import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UsernameInputDto {
    @ApiProperty({ required: true, description: "Email do usuário", example: "fulano@email.com" })
    @IsString()
    @IsNotEmpty()
    username: string;
}
