import { Module } from "@nestjs/common";
import { DialogsService } from "./dialogs.service";
import { DialogsController } from "./dialogs.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [DialogsController],
  providers: [DialogsService, PrismaService]
})
export class DialogsModule {}
