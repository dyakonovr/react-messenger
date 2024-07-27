import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma.service";
import { hash, verify } from "argon2";
import { unlink } from "fs/promises";

export type UserUpdateData = {
  nickname: string;
  login: string;
  oldPassword: string;
  newPassword: string;
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  findById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  findByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }

  async update(
    avatarFile: Express.Multer.File | undefined,
    otherData: Partial<UserUpdateData> | undefined,
    userId: number
  ) {
    const existUser = await this.findById(userId);
    if (!existUser) throw new NotFoundException("User is not defined!");

    if (otherData.oldPassword && otherData.newPassword) {
      const isOldPasswordCorrect = await verify(
        existUser.password,
        otherData.oldPassword
      );
      if (!isOldPasswordCorrect) throw new NotFoundException("Incorrect user password!");
    }

    // Delete previous avatar file
    if (existUser.avatar) {
      unlink(existUser.avatar)
        .then(() => console.log("previous avatar deleted"))
        .catch((error) => console.log("previous avatar delete error:", error));
    }

    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        avatar: avatarFile ? avatarFile.path : null,
        password: otherData.newPassword
          ? await hash(otherData.newPassword)
          : existUser.password,
        nickname: otherData.nickname ? otherData.nickname : existUser.nickname,
        login: otherData.login ? otherData.login : existUser.login
      },
      select: {
        id: true,
        avatar: true,
        nickname: true
      }
    });
  }
}
