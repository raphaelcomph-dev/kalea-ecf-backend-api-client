import { Module } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { EcfController } from "./api/rest/efc.controller";
import { EcfService } from "./services/efc.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcfFileModel } from "./services/models/efc-file.model";
import { HealthController } from "./api/rest/health.controller";
import { TerminusModule } from "@nestjs/terminus";

@Module({
    imports: [
        TerminusModule,
        TypeOrmModule.forRoot({
            type: "mssql",
            host: "localhost",
            port: 1433,
            username: "sa",
            password: "YourStrong!Passw0rd",
            database: "KaleaECF",
            options: {
                encrypt: false, // MSSQL-specific option
            },
            entities: [EcfFileModel],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([EcfFileModel]),
    ],
    controllers: [EcfController, HealthController],
    providers: [EcfService, AppService],
})
export class AppModule {}
