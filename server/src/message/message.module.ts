import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageGateway } from "./message.gateway";
import { PrismaService } from "src/prisma.service";
import { DialogsService } from "src/dialogs/dialogs.service";
import { CacheModule } from "@nestjs/cache-manager";
import { WsAuthGuard } from "src/utils/guards/ws-auth.guard";
import { ChatsService } from "src/chats/chats.service";

@Module({
  imports: [CacheModule.register()],
  providers: [
    MessageGateway,
    MessageService,
    DialogsService,
    PrismaService,
    ChatsService,
    WsAuthGuard
  ]
})
export class MessageModule {}
