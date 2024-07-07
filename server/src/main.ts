import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { join } from "path";
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

  app.use("/uploads", express.static(join(__dirname, "..", "..", "uploads")));

  app.use(cookieParser());

  const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 5000;
  await app.listen(port);
  console.log(`Application started on port ${port}`);
}
bootstrap();
