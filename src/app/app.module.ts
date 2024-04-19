import { NotificationModule } from "./notification/notification.module";
import { BalanceIndicatorModel } from "./services/models/balance-indicator.model";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./api/rest/auth.controller";
import { EcfController } from "./api/rest/ecf.controller";
import { HealthController } from "./api/rest/health.controller";
import { AuthService } from "./services/auth.service";
import { EcfService } from "./services/ecf.service";
import { EcfFileRepository } from "./services/infra/repositories/ecf-file.repository";
import { UserRepository } from "./services/infra/repositories/user.repository";
import { EcfFileModel } from "./services/models/ecf-file.model";
import { UserModel } from "./services/models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AppSettings } from "./app.settings";
import { EcfFileProcessInfoModel } from "./services/models/ecf-file-processing-info.model";
import { EcfFileProcessInfoRepository } from "./services/infra/repositories/ecf-file-processing-info.repository";
import { CustomerRepository } from "./services/infra/repositories/customer.repository";
import { CustomerModel } from "./services/models/customer.model";
import { CustomerUserModel } from "./services/models/customer-user.model";
import { ApiContext } from "./shared/api-context";
import { BalanceRepository } from "./services/infra/repositories/balance.repository";
import { CustomerBalanceModel } from "./services/models/customer-balance.model";

import "./shared/extensions/number.extension";
import "./shared/extensions/string.extension";
import { MailerModule } from "@nestjs-modules/mailer";

let mailModule = null;
if (AppSettings.isLocalEnv()) {
    mailModule = MailerModule.forRootAsync({
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
    });
} else {
    mailModule = MailerModule.forRootAsync({
        useFactory: () => ({
            transport: {
                host: "smtp.mailgun.org",
                port: 587, // or 587 for TLS
                secure: false, // true for 465, false for other ports
                ignoreTLS: true,
                auth: {
                    user: AppSettings.env.MAIL.MAILGUN.USER(),
                    pass: AppSettings.env.MAIL.MAILGUN.PASSWORD(),
                },
            },
        }),
    });
}

@Module({
    imports: [
        mailModule,
        NotificationModule,
        ConfigModule.forRoot(),
        TerminusModule,
        JwtModule.register({}),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    type: "mssql",
                    host: AppSettings.env.DATABASE.MSSQL.DB_HOST(),
                    port: AppSettings.env.DATABASE.MSSQL.DB_PORT(),
                    username: AppSettings.env.DATABASE.MSSQL.DB_USERNAME(),
                    password: AppSettings.env.DATABASE.MSSQL.DB_PASSWORD(),
                    database: AppSettings.env.DATABASE.MSSQL.DB_NAME(),
                    options: {
                        encrypt: false, // MSSQL-specific option
                    },
                    entities: [
                        BalanceIndicatorModel,
                        CustomerBalanceModel,
                        CustomerUserModel,
                        CustomerModel,
                        EcfFileProcessInfoModel,
                        EcfFileModel,
                        UserModel,
                    ],
                };
            },
        }),

        TypeOrmModule.forFeature([
            BalanceIndicatorModel,
            CustomerBalanceModel,
            CustomerUserModel,
            CustomerModel,
            EcfFileProcessInfoModel,
            EcfFileModel,
            UserModel,
        ]),
    ],
    controllers: [AuthController, EcfController, HealthController],
    providers: [
        ApiContext,
        AuthService,
        EcfService,
        UserRepository,
        CustomerRepository,
        EcfFileRepository,
        EcfFileProcessInfoRepository,
        BalanceRepository,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiContext).forRoutes("*");
    }
}
