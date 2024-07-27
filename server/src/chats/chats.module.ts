import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [],
  providers: [ChatsService, PrismaService]
})
export class ChatsModule {}
