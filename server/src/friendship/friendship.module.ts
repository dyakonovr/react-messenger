import { Module } from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { FriendshipController } from "./friendship.controller";
import { PrismaService } from "src/prisma.service";
import { ChatsService } from "src/chats/chats.service";

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, PrismaService, ChatsService]
})
export class FriendshipModule {}
