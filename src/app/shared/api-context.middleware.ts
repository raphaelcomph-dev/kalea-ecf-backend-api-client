import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ApiContext implements NestMiddleware {
    private static _customerId: number;
    private static _userId: number;

    constructor(private readonly jwtService: JwtService) {}

    use(req: any, res: any, next: (error?: any) => void) {
        ApiContext._customerId = null;
        ApiContext._userId = null;

        next();
    }

    private extractContextFromRequestHeaders(req: any) {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");

            const tokenDecoded = this.jwtService.decode(token);
            if (tokenDecoded) {
                ApiContext._customerId = tokenDecoded.customerId;
                ApiContext._userId = tokenDecoded.sub;
            }
        }
    }

    static setContext(customerId: number, userId: number): void {
        ApiContext._customerId = customerId;
        ApiContext._userId = userId;
    }

    static getContext(): { customerId: number; userId: number } {
        return { customerId: ApiContext._customerId, userId: ApiContext._userId };
    }
}
