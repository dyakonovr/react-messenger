import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PrismaService } from "./prisma.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DelayInterceptor } from "./utils/interceptors/delay.interceptor";
import { FriendshipModule } from "./friendship/friendship.module";
import { FriendsModule } from "./friends/friends.module";
import { DialogsModule } from "./dialogs/dialogs.module";
import { FileModule } from "./file/file.module";
import { MessageModule } from "./message/message.module";
import { DialogMessagesModule } from "./dialog-messages/dialog-messages.module";
import { ChatsModule } from "./chats/chats.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    UserModule,
    AuthModule,
    FriendshipModule,
    FriendsModule,
    DialogsModule,
    FileModule,
    MessageModule,
    DialogMessagesModule,
    ChatsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DelayInterceptor
    }
  ]
})
export class AppModule {}
