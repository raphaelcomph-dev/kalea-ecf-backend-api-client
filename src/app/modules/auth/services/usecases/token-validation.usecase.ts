import { JwtService } from "@nestjs/jwt";
import { TokenValidationOutputDto } from "../../api/dtos/output/token-validation.output.dto";
import { AppSettings } from "../../../../app.settings";

export class TokenValidationUsecase {
    constructor(private readonly jwtService: JwtService) {}

    async execute(accessToken: string): Promise<TokenValidationOutputDto> {
        let isValid = false;
        let userId = null;
        let customerId = null;

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: AppSettings.env.JWT.ACCESS_TOKEN.SECRET(),
            });

            isValid = true;
            userId = payload.sub;
            customerId = payload.customerId;
        } catch (error) {}

        return {
            isValid,
            userId,
            customerId,
        };
    }
}
