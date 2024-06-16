import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma.service";
import { RoleService } from "src/role/role.service";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService
  ) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  findById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  findByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }
}
