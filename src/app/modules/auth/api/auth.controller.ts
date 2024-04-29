import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiExcludeEndpoint,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { ApiErrorOutputDto } from "../../../shared/models/api-error.output.dto";
import { AuthService } from "../services/auth.service";
import { LoginInputDto } from "./dtos/input/login.input.dto";
import { UsernameInputDto } from "./dtos/input/username.input.dto";
import { LoginOutputDto } from "./dtos/output/login.output.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @ApiOperation({ description: "Realiza o login de um usuário previamente cadastrado." })
    @ApiBody({ type: LoginInputDto })
    @ApiOkResponse({ description: "Login realizado com sucesso.", type: LoginOutputDto })
    @ApiInternalServerErrorResponse({
        description:
            "Erro interno no servidor. Por favor, entre em contato conosco para investigarmos e resolvermos o problema o mais rápido possível.",
        type: ApiErrorOutputDto,
    })
    @ApiBadRequestResponse({
        description:
            "Requisição mal formatada. Ex: campos obrigatórios não informados, campos tipados erroneamente na requisição (inteiro deveria ser string, ...), etc.",
        type: ApiErrorOutputDto,
    })
    @ApiUnprocessableEntityResponse({
        description: "Erros de negócio. Ex: Usuário ou senha inválidos, ...",
        type: ApiErrorOutputDto,
    })
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginInputDto) {
        this.logger.log(`recebendo requisição login: ${dto.username}`);
        return this.authService.login(dto);
    }

    @ApiExcludeEndpoint()
    @Post("password/forgot")
    @HttpCode(HttpStatus.OK)
    async passwordForgot(@Body() dto: UsernameInputDto) {
        this.logger.log(`recebendo requisição esqueci senha: ${dto.username}`);
        return this.authService.passwordForgot(dto);
    }
}
