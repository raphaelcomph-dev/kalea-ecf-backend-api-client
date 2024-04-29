import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppSettings } from "./app.settings";

import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const envFile = `.env.${process.env.NODE_ENV || "local"}`;
    console.log(`carregando ${envFile}`);

    dotenv.config({ path: envFile });

    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
        .setTitle("Kalea:ECF - Public API")
        .setDescription(
            "Esta página contém a documentação de todos os endpoint atualmente disponíveis na API pública do projeto Kalea:ECF. \n\n Esta API abrange os endpoint de healthcheck, autenticação de usuários e manutenção de arquivos ECF . \n\nTodos os endpoints são protegidos por autenticação JWT que precisa ser enviada no header de cada requisição, excetuando os endpoints `/api/auth/...` e `/api/health`. \n\nEsta API também é utilizada pelo frontend do projeto.",
        )
        .setVersion("1.1.0")
        .setBasePath("api")
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
}
bootstrap();
