import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, PrismaService]
})
export class ChatsModule {}
