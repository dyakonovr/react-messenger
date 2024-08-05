import { Module } from "@nestjs/common";
import { DialogMessagesService } from "./dialog-messages.service";
import { DialogMessagesController } from "./dialog-messages.controller";
import { PrismaService } from "src/prisma.service";
import { ChatsService } from "src/chats/chats.service";

@Module({
  controllers: [DialogMessagesController],
  providers: [DialogMessagesService, PrismaService, ChatsService]
})
export class DialogMessagesModule {}
