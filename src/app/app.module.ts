import { Module } from "@nestjs/common";
import { AppController } from "./api/rest/app.controller";
import { AppService } from "./services/app.service";
import { EcfController } from "./api/rest/efc.controller";
import { EcfService } from "./services/efc.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcfFileModel } from "./services/models/efc-file.model";

@Module({
    imports: [
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
    controllers: [EcfController, AppController],
    providers: [EcfService, AppService],
})
export class AppModule {}
