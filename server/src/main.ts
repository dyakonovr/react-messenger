import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true // Это включает автоматическую трансформацию
    })
  );
  app.use(cookieParser());
  await app.listen(process.env.SERVER_PORT ? +process.env.SERVER_PORT : 5000);
}
bootstrap();