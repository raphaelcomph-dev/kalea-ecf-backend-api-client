import { IsNotEmpty, IsString } from "class-validator";

export class UsernameInputDto {
    @IsString()
    @IsNotEmpty()
    username: string;
}
