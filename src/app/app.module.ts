import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcfController } from "./api/rest/ecf.controller";
import { HealthController } from "./api/rest/health.controller";
import { NotifyController } from "./api/rest/notify.controller";
import { AppSettings } from "./app.settings";
import { AuthModule } from "./modules/auth/auth.module";
import { CustomerUserModel } from "./modules/auth/services/models/customer-user.model";
import { CustomerModel } from "./modules/auth/services/models/customer.model";
import { UserModel } from "./modules/auth/services/models/user.model";
import { NotificationModule } from "./modules/notification/notification.module";
import { EcfService } from "./services/ecf.service";
import { BalanceRepository } from "./services/infra/repositories/balance.repository";
import { EcfFileRepository } from "./services/infra/repositories/ecf-file.repository";
import { EcfProcessInfoRepository } from "./services/infra/repositories/ecf-processing-info.repository";
import { BalanceIndicatorModel } from "./services/models/balance-indicator.model";
import { CustomerBalanceModel } from "./services/models/customer-balance.model";
import { EcfFileModel } from "./services/models/ecf-file.model";
import { EcfInfoModel } from "./services/models/ecf-info.model";
import { ApiContext } from "./shared/api-context.middleware";
import { AuthGuard } from "./shared/auth.guard";

import "./shared/extensions/number.extension";
import "./shared/extensions/string.extension";
import { EcfStatusChangedGateway } from "./api/websocket/ecf-status-changed.gateway";

@Module({
    imports: [
        AuthModule,
        NotificationModule,
        ConfigModule.forRoot(),
        TerminusModule,
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
                        connectTimeout: 90000,
                        cancelTimeout: 180000,

                        abortTransactionOnError: true,
                    },
                    requestTimeout: 300000,
                    entities: [
                        BalanceIndicatorModel,
                        CustomerBalanceModel,
                        CustomerUserModel,
                        CustomerModel,
                        EcfInfoModel,
                        EcfFileModel,
                        UserModel,
                    ],
                };
            },
        }),

        TypeOrmModule.forFeature([BalanceIndicatorModel, CustomerBalanceModel, EcfInfoModel, EcfFileModel]),
    ],
    controllers: [NotifyController, EcfController, HealthController],
    providers: [
        EcfStatusChangedGateway,
        ApiContext,
        AuthGuard,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        EcfService,
        EcfFileRepository,
        EcfProcessInfoRepository,
        BalanceRepository,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiContext).forRoutes("*");
    }
}
