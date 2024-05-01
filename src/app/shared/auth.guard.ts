import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { ApiContext } from "./api-context.middleware";
import { AuthService } from "../modules/auth/services/auth.service";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isRequestPublicEndpoint = this.checkIfRequestIsPublicEndpoint(context);
        if (isRequestPublicEndpoint) {
            return true;
        }

        const token = this.extractTokenFromRequestHeader(context);
        if (!token) {
            throw new UnauthorizedException("É necessário informar um token JWT no header da requisição.");
        }
        const tokenValidationResponse = await this.authService.validateAccessToken(token);
        if (!tokenValidationResponse.isValid) {
            throw new UnauthorizedException("O token JWT informado está inválido.");
        }
        ApiContext.setContext(tokenValidationResponse.customerId, tokenValidationResponse.userId);
        return true;
    }

    private checkIfRequestIsPublicEndpoint(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return false;
    }

    private extractTokenFromRequestHeader(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
