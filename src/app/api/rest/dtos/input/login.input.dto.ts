import { IsNotEmpty, IsString } from "class-validator";

export class LoginInputDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
