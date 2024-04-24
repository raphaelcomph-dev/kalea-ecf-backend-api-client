import { NotFoundException } from "@nestjs/common";
import { UsernameInputDto } from "../../api/dtos/input/username.input.dto";
import { UserRepository } from "../infra/repositories/user.repository";
import { UserModel } from "../models/user.model";
import { KeyGenerator } from "../../../../shared/utils/key-generator";
import { NotificationService } from "../../../notification/services/notification.service";
import { PasswordForgotEmailInputDto } from "../../../notification/api/dtos/input/password-forgot-email.input.dto";

export class PasswordForgotUseCase {
    private user: UserModel;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly notificationService: NotificationService,
    ) {}

    async execute(dto: UsernameInputDto): Promise<void> {
        this.user = await this.userRepository.findByUserNameOrEmail(dto.username, dto.username);

        if (!this.user) {
            throw new NotFoundException("Não foi encontrado nenhum usuário cadastrado com esse email ");
        }

        const newPassword = KeyGenerator.generateCryptoBasedPassword();
        this.user.password = newPassword;
        await this.userRepository.save(this.user);

        const sendForgotPasswordEmailDto: PasswordForgotEmailInputDto = {
            email: this.user.email,
            name: this.user.name,
            newPassword: this.user.password,
        };
        await this.notificationService.sendForgotPasswordEmail(sendForgotPasswordEmailDto);
    }
}
