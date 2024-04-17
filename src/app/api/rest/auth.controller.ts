import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { LoginInputDto } from "./dtos/input/login.input.dto";
import { AuthService } from "../../services/auth.service";
import { UsernameInputDto } from "./dtos/input/username.input.dto";

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginInputDto) {
        this.logger.log(`recebendo requisição login: ${dto.username}`);
        return this.authService.login(dto);
    }

    @Post("password/forgot")
    @HttpCode(HttpStatus.OK)
    async passwordForgot(@Body() dto: UsernameInputDto) {
        this.logger.log(`recebendo requisição esqueci senha: ${dto.username}`);
        return this.authService.passwordForgot(dto);
    }
}
