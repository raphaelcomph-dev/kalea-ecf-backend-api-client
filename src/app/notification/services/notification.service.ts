import { Injectable, Logger } from "@nestjs/common";
import { PasswordForgotEmailInputDto } from "../api/dtos/input/password-forgot-email.input.dto";
import { AppSettings } from "../../app.settings";
import { Constants } from "../../shared/constants";
import { MailerService } from "@nestjs-modules/mailer";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(private mailerService: MailerService) {}

    async sendForgotPasswordEmail(dto: PasswordForgotEmailInputDto): Promise<void> {
        this.logger.log("Sending forgot password email to " + dto.email);

        // const emailFolder = AppSettings.isLocalEnv()
        //     ? "../../../src/resources/email-templates"
        //     : "../../resources/email-templates";
        const emailFolder = "../../../src/resources/email-templates";
        let file = fs.readFileSync(path.resolve(__dirname, `${emailFolder}/password-forgot.html`), "utf-8");

        file = file.replaceAll("{{user.name}}", dto.name);
        file = file.replaceAll("{{user.password}}", dto.newPassword);
        file = file.replaceAll("{{portal.paths.login}}", AppSettings.env.PORTAL.PATHS.LOGIN());

        const msg = {
            to: dto.email,
            from: Constants.EMAIL.SENDERS.NOTIFICATIONS,
            subject: "[Kalea - ECF]: Esqueceu sua senha?",
            html: file,
        };

        this.sendEmail(msg);
    }

    private async sendEmail(msg): Promise<void> {
        const response = await this.mailerService.sendMail(msg);
        console.log("Email sending Response", response);
    }
}
