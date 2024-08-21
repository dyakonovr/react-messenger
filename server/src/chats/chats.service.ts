import { Injectable } from "@nestjs/common";
import { ChatParticipant } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userIds: number[], name: string | null, avatar: string | null) {
    return this.prisma.$transaction(async (prisma) => {
      const chat = await prisma.chat.create({
        data: {
          avatar,
          name
        }
      });

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

  async getChatParticipantsById(
    chatId: number
  ): Promise<{ user_id: ChatParticipant["user_id"] }[]> {
    return this.prisma.chatParticipant.findMany({
      where: {
        chat_id: chatId
      },
      select: {
        user_id: true
      }
    });
  }

  async isUserInChat(chatId: number, userId: number): Promise<boolean> {
    const result = await this.prisma.chatParticipant.findFirst({
      where: {
        chat_id: chatId,
        user_id: userId
      }
    });

    return !!result;
  }
}
