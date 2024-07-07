import { Injectable } from "@nestjs/common";
import { Message } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { PaginationResponseDto } from "src/utils/pagination/response.dto";
import { DialogMessagesRequestDto } from "./dto/request.dto";

type MessageType = Omit<Message, "sender_id" | "recipient_id" | "deletedAt"> & {
  isMy: boolean;
  senderId: number;
  recipientId: number;
};

@Injectable()
export class DialogMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number, requestDto: DialogMessagesRequestDto) {
    const offset = (requestDto.page - 1) * requestDto.limit;

    const totalMessages = await this.prisma.$queryRaw<
      {
        count: number;
      }[]
    >`
      SELECT COUNT(*)
      FROM messages
      WHERE 
        (sender_id = ${userId} AND recipient_id = ${requestDto.friendId}) 
        OR (sender_id = ${requestDto.friendId} AND recipient_id = ${userId})
    `;

    // const messages = await this.prisma.$queryRaw<MessageType[]>`
    //   SELECT
    //     id,
    //     text,
    //     "isRead",
    //     "createdAt",
    //     "updatedAt",
    //     CASE
    //       WHEN sender_id = ${userId} THEN true
    //       ELSE false
    //     END as "isMy"
    //   FROM
    //     messages
    //   WHERE
    //     (sender_id = ${userId} AND recipient_id = ${requestDto.friendId})
    //     OR (sender_id = ${requestDto.friendId} AND recipient_id = ${userId})
    //   ORDER BY
    //     "createdAt" DESC
    //   LIMIT ${requestDto.limit} OFFSET ${offset}
    // `;

    const messages = await this.prisma.$queryRaw<MessageType[]>`
      SELECT 
        id, 
        text, 
        "isRead", 
        "createdAt", 
        "updatedAt", 
        "sender_id" as "senderId",
        "recipient_id" as "recipientId"
      FROM 
        messages 
      WHERE 
        (sender_id = ${userId} AND recipient_id = ${requestDto.friendId}) 
        OR (sender_id = ${requestDto.friendId} AND recipient_id = ${userId})
      ORDER BY 
        "createdAt" DESC 
      LIMIT ${requestDto.limit} OFFSET ${offset}
    `;

    const totalPages = Math.ceil(Number(totalMessages[0].count) / requestDto.limit);

    const formattedMessages = messages.reduce((acc, current) => {
      const { id, ...rest } = current;
      acc[id] = rest;
      return acc;
    }, {});

    return new PaginationResponseDto(formattedMessages, requestDto.page, totalPages);
  }
}
