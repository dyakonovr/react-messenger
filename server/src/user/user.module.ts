import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { RoleService } from "src/role/role.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [UserController],
  providers: [UserService, RoleService, PrismaService]
})
export class UserModule {}
