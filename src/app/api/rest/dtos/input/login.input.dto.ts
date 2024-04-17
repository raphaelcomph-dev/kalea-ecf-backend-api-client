import { IsNotEmpty, IsString } from "class-validator";
import { UsernameInputDto } from "./username.input.dto";

export class LoginInputDto extends UsernameInputDto {
    @IsString()
    @IsNotEmpty()
    password: string;
}
