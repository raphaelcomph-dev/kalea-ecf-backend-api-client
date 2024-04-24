import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { LoginInputDto } from "../../api/dtos/input/login.input.dto";
import { LoginOutputDto } from "../../api/dtos/output/login.output.dto";
import { UserRepository } from "../infra/repositories/user.repository";
import { UserModel } from "../models/user.model";
import { AppSettings } from "../../../../app.settings";
import { JwtService } from "@nestjs/jwt";
import { CustomerModel } from "../models/customer.model";
import { CustomerRepository } from "../infra/repositories/customer.repository";

export class LoginUseCase {
    private user: UserModel;
    private customer: CustomerModel;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(dto: LoginInputDto): Promise<LoginOutputDto> {
        this.user = await this.userRepository.findByUserNameOrEmail(dto.username, dto.username);

        if (!this.user) {
            throw new UnprocessableEntityException("Usuário ou senha inválidos");
        }

        if (this.user.password !== dto.password) {
            throw new UnprocessableEntityException("Usuário ou senha inválidos");
        }

        this.customer = await this.customerRepository.findByUserId(this.user.id);

        return this.generateAccessTokenJWT();
    }

    private generateAccessTokenJWT(): LoginOutputDto {
        const refreshTokenPayload = { sub: this.user.id };
        const accessTokenPayload = {
            ...refreshTokenPayload,
            customerId: this.customer.id,
            name: this.user.name,
            email: this.user.email,
        };

        const accessToken = this.jwtService.sign(accessTokenPayload, {
            secret: AppSettings.env.JWT.ACCESS_TOKEN.SECRET(),
            expiresIn: AppSettings.env.JWT.ACCESS_TOKEN.EXPIRES_IN(),
        });
        const refreshToken = null;
        return {
            accessToken,
            refreshToken,
        };
    }
}
