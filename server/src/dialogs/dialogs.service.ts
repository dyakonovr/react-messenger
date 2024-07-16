import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PaginationRequestDto } from "src/utils/pagination/request.dto";
import { PaginationResponseDto } from "src/utils/pagination/response.dto";

// type DialogType = {
//   userId: number;
//   nickname: string;
//   avatar: string | null;
//   lastMessageId: number | null;
//   lastMessageText: string | null;
//   lastMessageIsMy: boolean | null;
//   lastMessageCreatedAt: Date | null;
//   lastMessageIsRead: boolean | null;
//   newMessagesCount: number;
// };

type DialogType = {
  chatId: number;
  chatName: string;
  chatAvatar: string | null;
  lastMessageId: number | null;
  lastMessageText: string | null;
  lastMessageSenderId: number | null;
  lastMessageCreatedAt: string | null;
  lastMessageUpdatedAt: string | null;
  lastMessageIsRead: boolean | null;
  newMessagesCount: number;
};

@Injectable()
export class DialogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(currentUserId: number, requestDto: PaginationRequestDto) {
    const offset = (requestDto.page - 1) * requestDto.limit;

    const items = await this.prisma.$queryRaw<DialogType[]>`
        WITH last_messages AS (
            SELECT DISTINCT ON (m."chat_id")
                m."chat_id",
                m.id AS "lastMessageId",
                m.text AS "lastMessageText",
                m."sender_id" AS "lastMessageSenderId",
                m."created_at" AS "lastMessageCreatedAt",
                m."updated_at" AS "lastMessageUpdatedAt",
                m."is_read" AS "lastMessageIsRead"
            FROM messages m
            ORDER BY m."chat_id", m."created_at" DESC
        ),
        participant_count AS (
            SELECT
                cp."chat_id",
                COUNT(cp."user_id") AS participant_count
            FROM
                chat_participants cp
            GROUP BY
                cp."chat_id"
        ),
        other_participant AS (
            SELECT
                cp1."chat_id",
                u2.nickname AS other_nickname,
                u2.avatar AS other_avatar
            FROM
                chat_participants cp1
            JOIN chat_participants cp2 ON cp1."chat_id" = cp2."chat_id" AND cp1."user_id" <> cp2."user_id"
            JOIN users u2 ON cp2."user_id" = u2.id
            WHERE
                cp1."user_id" = ${currentUserId}
        )
        SELECT
            cp."chat_id" AS "chatId",
            COALESCE(op.other_nickname, c.name) AS "chatName",
            COALESCE(op.other_avatar, c.avatar) AS "chatAvatar",
            lm."lastMessageId",
            lm."lastMessageText",
            lm."lastMessageSenderId",
            lm."chat_id" AS "lastMessageChatId",
            lm."lastMessageCreatedAt",
            lm."lastMessageUpdatedAt",
            lm."lastMessageIsRead",
            COUNT(CASE WHEN m."chat_id" = cp."chat_id" AND m."is_read" = FALSE THEN 1 END) AS "newMessagesCount"
        FROM
            chat_participants cp
            JOIN chats c ON cp."chat_id" = c.id
            JOIN users u ON cp."user_id" = u.id
            LEFT JOIN participant_count pc ON cp."chat_id" = pc."chat_id"
            LEFT JOIN other_participant op ON cp."chat_id" = op."chat_id" AND pc.participant_count = 2
            LEFT JOIN last_messages lm ON cp."chat_id" = lm."chat_id"
            LEFT JOIN messages m ON cp."chat_id" = m."chat_id"
        WHERE
            cp."chat_id" IN (SELECT "chat_id" FROM chat_participants WHERE "user_id" = ${currentUserId})
        GROUP BY
            cp."chat_id", op.other_nickname, op.other_avatar, c.name, c.avatar, lm."lastMessageId", lm."lastMessageText", lm."lastMessageSenderId", lm."chat_id", lm."lastMessageCreatedAt", lm."lastMessageUpdatedAt", lm."lastMessageIsRead", pc.participant_count
        ORDER BY
            lm."lastMessageCreatedAt" DESC
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const totalDialogs = await this.prisma.chat.count({
      where: {
        ChatParticipant: {
          every: {
            user_id: currentUserId
          }
        }
      }
    });

    const totalPages = Math.ceil(Number(totalDialogs) / requestDto.limit);
    const formattedDialogs = this.formatData(items);

    return new PaginationResponseDto(formattedDialogs, requestDto.page, totalPages);
  }

  async findOne(chatId: number) {
    const result = await this.prisma.$queryRaw<DialogType[]>`
        WITH last_messages AS (
            SELECT DISTINCT ON (m."chat_id")
                m."chat_id",
                m.id AS "lastMessageId",
                m.text AS "lastMessageText",
                m."sender_id" AS "lastMessageSenderId",
                m."created_at" AS "lastMessageCreatedAt",
                m."updated_at" AS "lastMessageUpdatedAt",
                m."is_read" AS "lastMessageIsRead"
            FROM messages m
            WHERE m."chat_id" = ${chatId}
            ORDER BY m."chat_id", m."created_at" DESC
        ),
        participant_count AS (
            SELECT
                cp."chat_id",
                COUNT(cp."user_id") AS participant_count
            FROM
                chat_participants cp
            WHERE cp."chat_id" = ${chatId}
            GROUP BY
                cp."chat_id"
        ),
        other_participant AS (
            SELECT
                cp1."chat_id",
                u2.nickname AS other_nickname,
                u2.avatar AS other_avatar
            FROM
                chat_participants cp1
            JOIN chat_participants cp2 ON cp1."chat_id" = cp2."chat_id" AND cp1."user_id" <> cp2."user_id"
            JOIN users u2 ON cp2."user_id" = u2.id
            WHERE
                cp1."chat_id" = ${chatId}
        )
        SELECT
            cp."chat_id" AS "chatId",
            COALESCE(op.other_nickname, c.name) AS "chatName",
            COALESCE(op.other_avatar, c.avatar) AS "chatAvatar",
            lm."lastMessageId",
            lm."lastMessageText",
            lm."lastMessageSenderId",
            lm."chat_id" AS "lastMessageChatId",
            lm."lastMessageCreatedAt",
            lm."lastMessageUpdatedAt",
            lm."lastMessageIsRead",
            COUNT(CASE WHEN m."chat_id" = cp."chat_id" AND m."is_read" = FALSE THEN 1 END) AS "newMessagesCount"
        FROM
            chat_participants cp
            JOIN chats c ON cp."chat_id" = c.id
            LEFT JOIN participant_count pc ON cp."chat_id" = pc."chat_id"
            LEFT JOIN other_participant op ON cp."chat_id" = op."chat_id" AND pc.participant_count = 2
            LEFT JOIN last_messages lm ON cp."chat_id" = lm."chat_id"
            LEFT JOIN messages m ON cp."chat_id" = m."chat_id"
        WHERE
            cp."chat_id" = ${chatId}
        GROUP BY
            cp."chat_id", op.other_nickname, op.other_avatar, c.name, c.avatar, lm."lastMessageId", lm."lastMessageText", lm."lastMessageSenderId", lm."chat_id", lm."lastMessageCreatedAt", lm."lastMessageUpdatedAt", lm."lastMessageIsRead", pc.participant_count;
    `;

    return this.formatData(result);
  }

  formatData(data: DialogType[]) {
    return data.reduce((acc, current) => {
      const { chatId, ...rest } = current;
      acc[chatId] = {
        info: {
          name: rest.chatName,
          avatar: rest.chatAvatar
        },
        lastMessage: rest.lastMessageId
          ? {
              id: rest.lastMessageId,
              text: rest.lastMessageText,
              senderId: rest.lastMessageSenderId,
              createdAt: rest.lastMessageCreatedAt,
              updatedAt: rest.lastMessageUpdatedAt,
              isRead: rest.lastMessageIsRead
            }
          : null,
        newMessagesCount: Number(rest.newMessagesCount)
      };
      return acc;
    }, {});
  }
}
