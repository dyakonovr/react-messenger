import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PrismaService } from "./prisma.service";
import { RoleModule } from "./role/role.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DelayInterceptor } from "./utils/interceptors/delay.interceptor";
import { FriendshipModule } from "./friendship/friendship.module";
import { FriendsModule } from "./friends/friends.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    UserModule,
    RoleModule,
    AuthModule,
    FriendshipModule,
    FriendsModule
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
