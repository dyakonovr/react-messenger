import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userIds: number[]) {
    return this.prisma.$transaction(async (prisma) => {
      const chat = await prisma.chat.create({});

      const chatParticipants = await prisma.chatParticipant.createMany({
        data: userIds.map((userId) => ({
          user_id: userId,
          chat_id: chat.id
        })),
        skipDuplicates: true
      });

      return { chat, chatParticipants };
    });
  }

  async deleteByUserIds(friendIds: number[]) {
    // const chat = await this.prisma.chat.create({});

    // const chatParticipants = await this.prisma.chatParticipant.createMany({
    //   data: userIds.map((userId) => ({
    //     user_id: userId,
    //     chat_id: chat.id
    //   })),
    //   skipDuplicates: true
    // });

    // return { chat, chatParticipants };

    return await this.prisma.chat.deleteMany({
      where: {
        ChatParticipant: {
          every: {
            user_id: {
              in: friendIds
            }
          }
        }
      }
    });
  }
}
