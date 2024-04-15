import { Injectable } from "@nestjs/common";
import { UserRepository } from "./infra/repositories/user.repository";
import { LoginInputDto } from "../api/rest/dtos/input/login.input.dto";
import { LoginOutputDto } from "../api/rest/dtos/output/login.output.dto";
import { LoginUseCase } from "./usecases/login.usecase";
import { JwtService } from "@nestjs/jwt";
import { CustomerRepository } from "./infra/repositories/customer.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly customerRepository: CustomerRepository,
        private jwtService: JwtService,
    ) {}

    login(dto: LoginInputDto): Promise<LoginOutputDto> {
        return new LoginUseCase(this.userRepository, this.customerRepository, this.jwtService).execute(dto);
    }
}
