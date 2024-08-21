import { BadRequestException, Injectable } from "@nestjs/common";
import { Message } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { PaginationResponseDto } from "src/utils/dto/pagination/response.dto";
import { DialogMessagesRequestDto } from "./dto/request.dto";
import { ChatsService } from "src/chats/chats.service";

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
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatService: ChatsService
  ) {}

  async findAll(userId: number, requestDto: DialogMessagesRequestDto) {
    const isUserInChat = await this.chatService.isUserInChat(requestDto.chatId, userId);
    if (!isUserInChat) throw new BadRequestException("Unable to receive chat messages");

    const offset = (requestDto.page - 1) * requestDto.limit;

    const totalMessages = await this.prisma.message.count({
      where: {
        chat_id: requestDto.chatId,
        chat: {
          ChatParticipant: {
            some: {
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
      ORDER BY
          m.created_at DESC
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
