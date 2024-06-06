import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppSettings } from "./app.settings";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as dotenv from "dotenv";
import * as pkg from "pkginfo";

async function bootstrap() {
    const envFile = `.env.${process.env.NODE_ENV || "local"}`;
    console.log(`carregando ${envFile}`);

    dotenv.config({ path: envFile });

    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.setGlobalPrefix("api");

    pkg(module, "version");
    const version = module.exports.version;
    const config = new DocumentBuilder()
        .setTitle("Kalea:ECF - Public API")
        .setDescription(
            "Esta página contém a documentação de todos os endpoint atualmente disponíveis na API pública do projeto Kalea:ECF. \n\n Esta API abrange os endpoint de healthcheck, autenticação de usuários e manutenção de arquivos ECF . \n\nTodos os endpoints são protegidos por autenticação JWT que precisa ser enviada no header de cada requisição, excetuando os endpoints `/api/auth/...` e `/api/health`. \n\nEsta API também é utilizada pelo frontend do projeto.",
        )
        .setVersion(version)
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                name: "JWT",
                description: "Enter JWT token",
                in: "header",
            },
            "access-token",
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(AppSettings.env.PORT());
    const url = await app.getUrl();
    console.log(`Application is running on ${url}`);
    console.log(`Version: ${version}`);
}
bootstrap();
