import { EcfService } from "./services/ecf.service";
import { EcfController } from "./api/rest/ecf.controller";
import { Module } from "@nestjs/common";
import { AppController } from "./api/rest/app.controller";
import { AppService } from "./services/app.service";

@Module({
    imports: [],
    controllers: [EcfController, AppController],
    providers: [EcfService, AppService],
})
export class AppModule {}
