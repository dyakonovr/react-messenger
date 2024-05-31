import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { RoleService } from "src/role/role.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService, PrismaService]
})
export class AuthModule {}
