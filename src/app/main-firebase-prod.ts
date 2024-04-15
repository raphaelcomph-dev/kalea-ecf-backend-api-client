import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as express from "express";
import * as functions from "firebase-functions";

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
    dotenv.config({ path: ".env.prod" });
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance), { cors: true });
    // TODO: permitir CORS somente para o bff
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.setGlobalPrefix("api");
    await app.init();
};
export const kalea_ecf_prod_backend_api_client = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
