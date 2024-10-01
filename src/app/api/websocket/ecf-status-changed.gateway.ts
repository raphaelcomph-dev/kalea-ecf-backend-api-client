import {
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from "@nestjs/websockets";
import { Server } from "http";
import { AppSettings } from "../../app.settings";

@WebSocketGateway({
    cors: true,
})
export class EcfStatusChangedGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("events")
    handleEvent(@MessageBody() data: string) {
        this.server.emit("events", data);
    }

    handleConnection(client: any, ...args: any[]) {
        console.log("User connected");
    }

    handleDisconnect(client: any) {
        console.log("User disconnected");
    }

    afterInit(server: any) {
        console.log("Socket is live");
    }

    // Emit message to all connected clients
    sendRefreshMessage(ecfId: number) {
        this.server.emit("refreshPage", { ecfId });
    }
}
