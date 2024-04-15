import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ApiContext implements NestMiddleware {
    private static _customerId: number;
    private static _userId: number;

    constructor(private readonly jwtService: JwtService) {}

    use(req: any, res: any, next: (error?: any) => void) {
        this.extractContextFromRequestHeaders(req);

        // this.throwExceptionIfUserIdIsMissing();

        next();
    }

    // private throwExceptionIfUserIdIsMissing() {
    //     if (!ApiContext._userId) {
    //         throw new PreconditionFailedException("User id not found in headers");
    //     }
    // }

    private extractContextFromRequestHeaders(req: any) {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");

            const tokenDecoded = this.jwtService.decode(token);
            ApiContext._customerId = tokenDecoded.customerId;
            ApiContext._userId = tokenDecoded.sub;
        }
    }

    static getContext(): { customerId: number; userId: number } {
        return { customerId: ApiContext._customerId, userId: ApiContext._userId };
    }
}
