import { MailerModule } from "@nestjs-modules/mailer";
import { NotificationService } from "./services/notification.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: "localhost",
                    // secure: false,
                    // auth: {
                    //     user: "user@example.com",
                    //     pass: "topsecret",
                    // },
                    ignoreTLS: true,
                    port: 1025,
                },
            }),
        }),
    ],
    controllers: [],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
