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

@Module({
    imports: [
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
                    entities: [UserModel, CustomerModel, CustomerUserModel, EcfFileModel, EcfFileProcessInfoModel],
                };
            },
        }),

        TypeOrmModule.forFeature([UserModel, CustomerModel, CustomerUserModel, EcfFileModel, EcfFileProcessInfoModel]),
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
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiContext).forRoutes("*");
    }
}
