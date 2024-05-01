import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import * as express from "express";
import * as functions from "firebase-functions";
import * as pkg from "pkginfo";

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
    dotenv.config({ path: ".env.qa" });
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance), { cors: true });
    // TODO: permitir CORS somente para o bff
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
        .addServer("/kalea_ecf_backend_api_client-qa")
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

    await app.init();
};
export const kalea_ecf_qa_backend_api_client = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
