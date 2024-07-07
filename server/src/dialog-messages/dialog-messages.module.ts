import { Module } from "@nestjs/common";
import { DialogMessagesService } from "./dialog-messages.service";
import { DialogMessagesController } from "./dialog-messages.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [DialogMessagesController],
  providers: [DialogMessagesService, PrismaService]
})
export class DialogMessagesModule {}
