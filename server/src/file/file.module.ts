import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [],
  providers: [FileService, PrismaService]
})
export class FileModule {}
