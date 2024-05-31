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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    UserModule,
    RoleModule,
    AuthModule
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
