import { Injectable } from "@nestjs/common";
import { Message } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { PaginationResponseDto } from "src/utils/pagination/response.dto";
import { DialogMessagesRequestDto } from "./dto/request.dto";

type MessageType = Omit<
  Message,
  "sender_id" | "is_read" | "created_at" | "updated_at" | "deleted_at"
> & {
  senderId: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class DialogMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number, requestDto: DialogMessagesRequestDto) {
    const offset = (requestDto.page - 1) * requestDto.limit;

    const totalMessages = await this.prisma.message.count({
      where: {
        chat_id: requestDto.chatId,
        chat: {
          ChatParticipant: {
            every: {
              user_id: userId
            }
          }
        }
      }
    });

    const messages = await this.prisma.$queryRaw<MessageType[]>`
      SELECT 
          m.id,
          m.text,
          m.is_read as "isRead",
          m.created_at as "createdAt",
          m.updated_at as "updatedAt",
          m.sender_id AS "senderId"
      FROM 
          messages m
      JOIN 
          chats c ON m.chat_id = c.id
      JOIN 
          chat_participants cp ON c.id = cp.chat_id
      WHERE 
          cp.user_id = ${userId}
          AND m.chat_id = ${requestDto.chatId}
      LIMIT 
          ${requestDto.limit}
      OFFSET 
          ${offset};

    `;

    const totalPages = Math.ceil(Number(totalMessages) / requestDto.limit);

    const formattedMessages = messages.reduce((acc, current) => {
      const { id, ...rest } = current;
      acc[id] = rest;
      return acc;
    }, {});

    return new PaginationResponseDto(formattedMessages, requestDto.page, totalPages);
  }
}
