import { IsNotEmpty, IsString } from "class-validator";
import { UsernameInputDto } from "./username.input.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginInputDto extends UsernameInputDto {
    @ApiProperty({ required: true, description: "Senha do usuário", example: "P@ssw0rd" })
    @IsString()
    @IsNotEmpty()
    password: string;
}
