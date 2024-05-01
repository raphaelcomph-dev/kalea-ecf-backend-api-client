import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from "@nestjs/terminus";
import * as pkg from "pkginfo";
import { Public } from "../../shared/auth.guard";

@ApiTags("health")
@Controller("health")
@Public()
export class HealthController {
    private readonly version: string;

    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {
        pkg(module, "version");
        this.version = module.exports.version;
    }

    @ApiOperation({
        description:
            "Retorna a versão da API e o status (`up` ou `down`) de todos os servicos conectados na API (ex: banco de dados, ...)",
    })
    @Get()
    @HealthCheck()
    check() {
        return this.health.check([() => this.db.pingCheck("database")]).then((data) => ({
            ...data,
            version: this.version,
        }));
    }
}
