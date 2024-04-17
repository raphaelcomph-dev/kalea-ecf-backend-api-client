import { NotFoundException } from "@nestjs/common";
import { UsernameInputDto } from "../../api/rest/dtos/input/username.input.dto";
import { UserRepository } from "../infra/repositories/user.repository";
import { UserModel } from "../models/user.model";
import { KeyGenerator } from "../../shared/utils/key-generator";

export class PasswordForgotUseCase {
    private user: UserModel;

    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: UsernameInputDto): Promise<void> {
        this.user = await this.userRepository.findByUserNameOrEmail(dto.username, dto.username);

        if (!this.user) {
            throw new NotFoundException("Não foi encontrado nenhum usuário cadastrado com esse email ");
        }

        const newPassword = KeyGenerator.generateCryptoBasedPassword();
        this.user.password = newPassword;
        await this.userRepository.save(this.user);

        // TODO: enviar notificação por email com a nova senha do usuário
    }
}
