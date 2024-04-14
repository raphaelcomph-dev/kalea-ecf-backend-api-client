import { Controller, Get } from "@nestjs/common";
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from "@nestjs/terminus";
import * as pkg from "pkginfo";

@Controller("health")
export class HealthController {
    private readonly version: string;

    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {
        pkg(module, "version");
        this.version = module.exports.version;
    }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([() => this.db.pingCheck("database")]).then((data) => ({
            ...data,
            version: this.version,
        }));
    }
}
