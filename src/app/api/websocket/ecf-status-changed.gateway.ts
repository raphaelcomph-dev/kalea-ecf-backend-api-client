import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AppSettings } from "../../app.settings";

@WebSocketGateway({
    cors: {
        origin: AppSettings.env.FRONTEND.BASE_URL(),
        methods: ["GET", "POST"],
        credentials: true,
    },
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
