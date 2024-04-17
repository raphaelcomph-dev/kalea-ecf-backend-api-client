import { NotificationService } from "./services/notification.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
