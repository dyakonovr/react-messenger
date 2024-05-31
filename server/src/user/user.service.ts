import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
import { RoleService } from "src/role/role.service";
import { User } from "@prisma/client";

type UserWithIsFriendField = Pick<User, "id" | "avatar" | "nickname"> & {
  isFriend: boolean;
};

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService
  ) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  findAll() {
    const currentUserId = 7;
    return this.prisma.$queryRaw<UserWithIsFriendField[]>`
          SELECT
            u.id,
            u.nickname,
            u.avatar,
            CASE
              WHEN f1.user_id IS NOT NULL OR f2.friend_id IS NOT NULL THEN TRUE
              ELSE FALSE
            END AS "isFriend"
          FROM
            users u
          LEFT JOIN friends f1 ON u.id = f1.friend_id AND f1.user_id = ${currentUserId}
          LEFT JOIN friends f2 ON u.id = f2.user_id AND f2.friend_id = ${currentUserId}
          WHERE u.id <> ${currentUserId};
    `;
  }

  findById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  findByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
