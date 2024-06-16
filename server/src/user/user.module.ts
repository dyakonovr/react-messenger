import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";
import { RoleService } from "src/role/role.service";

@Module({
  controllers: [UserController],
  providers: [UserService, RoleService, PrismaService]
})
export class UserModule {}
