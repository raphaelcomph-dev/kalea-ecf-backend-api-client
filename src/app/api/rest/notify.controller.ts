import { Controller, Param, Patch, Post } from "@nestjs/common";
import { EcfStatusChangedGateway } from "../websocket/ecf-status-changed.gateway";

@Controller("notify")
export class NotifyController {
    constructor(private readonly ecfStatusChangedGateway: EcfStatusChangedGateway) {}

    @Post("ecf/:ecfId/status")
    notifyEcfStatusChanged(@Param("ecfId") ecfId: number): void {
        console.log(`Notifying ecf ${ecfId} status changed...`);
        this.ecfStatusChangedGateway.sendRefreshMessage(ecfId);
    }
}
