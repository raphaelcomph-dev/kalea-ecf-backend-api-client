import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppSettings } from "./app.settings";

import * as dotenv from "dotenv";

async function bootstrap() {
    const envFile = `.env.${process.env.NODE_ENV || "local"}`;
    console.log(`carregando ${envFile}`);

    dotenv.config({ path: envFile });

    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.setGlobalPrefix("api");

    await app.listen(AppSettings.env.PORT());
    const url = await app.getUrl();
    console.log(`Application is running on ${url}`);
}
bootstrap();
