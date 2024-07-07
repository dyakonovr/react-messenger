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
  userId: number;
  nickname: string;
  avatar: string | null;
  lastMessageId: number | null;
  lastMessageText: string | null;
  lastMessageSenderId: number | null;
  lastMessageRecipientId: number | null;
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
        SELECT
          u.id AS "userId",
          u.nickname,
          u.avatar,
          lm.id AS "lastMessageId",
          lm.text AS "lastMessageText",
          lm."sender_id" AS "lastMessageSenderId",
          lm."recipient_id" AS "lastMessageRecipientId",
          lm."createdAt" AS "lastMessageCreatedAt",
          lm."updatedAt" AS "lastMessageUpdatedAt",
          lm."isRead" AS "lastMessageIsRead",
          COUNT(CASE WHEN m."recipient_id" = ${currentUserId} AND m."isRead" = FALSE THEN 1 END) AS "newMessagesCount"
      FROM
          users u
          LEFT JOIN friendships f ON (
              (f."inviter_id" = u.id OR f."accepter_id" = u.id)
              AND f.status = 'REQUEST_ACCEPTED'
          )
          LEFT JOIN LATERAL (
              SELECT
                  m.*
              FROM
                  messages m
              WHERE
                  (m."sender_id" = u.id AND m."recipient_id" = ${currentUserId})
                  OR (m."recipient_id" = u.id AND m."sender_id" = ${currentUserId})
              ORDER BY
                  m."createdAt" DESC
              LIMIT 1
          ) lm ON TRUE
          LEFT JOIN messages m ON (
              (m."sender_id" = u.id AND m."recipient_id" = ${currentUserId})
              OR (m."recipient_id" = u.id AND m."sender_id" = ${currentUserId})
          )
      WHERE
          (f."inviter_id" = ${currentUserId} OR f."accepter_id" = ${currentUserId})
          AND u.id <> ${currentUserId}
      GROUP BY
          u.id, lm.id, lm.text, lm."sender_id", lm."recipient_id", lm."createdAt", lm."updatedAt", lm."isRead"
      ORDER BY
          lm."createdAt" DESC
      LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const totalDialogs = await this.prisma.$queryRaw<{
      count: number;
    }>`
        SELECT
          COUNT(*)
        FROM
          users u
          LEFT JOIN friendships f ON (
            (f."inviter_id" = u.id OR f."accepter_id" = u.id)
            AND f.status::text = 'REQUEST_ACCEPTED'
          )
        WHERE
          (f."inviter_id" = ${currentUserId} OR f."accepter_id" = ${currentUserId})
          AND u.id <> ${currentUserId};
      `;

    const totalPages = Math.ceil(Number(totalDialogs[0].count) / requestDto.limit);
    const formattedDialogs = this.formatData(items);

    // const formattedDialogs = items.reduce((acc, current) => {
    //   const { userId, ...rest } = current;

    //   acc = { ...acc, ...this.formatData(userId, rest) };
    //   // acc[userId] = {
    //   //   user: {
    //   //     nickname: rest.nickname,
    //   //     avatar: rest.avatar
    //   //   },
    //   //   lastMessage: rest.lastMessageId
    //   //     ? {
    //   //         id: rest.lastMessageId,
    //   //         text: rest.lastMessageText,
    //   //         recipientId: rest.lastMessageRecipientId,
    //   //         senderId: rest.lastMessageSenderId,
    //   //         createdAt: rest.lastMessageCreatedAt,
    //   //         updatedAt: rest.lastMessageUpdatedAt,
    //   //         isRead: rest.lastMessageIsRead
    //   //       }
    //   //     : null,
    //   //   newMessagesCount: Number(rest.newMessagesCount)
    //   // };

    //   return acc;
    // }, {});

    return new PaginationResponseDto(formattedDialogs, requestDto.page, totalPages);
  }

  async findOne(currentUserId: number, friendId: number) {
    const result = await this.prisma.$queryRaw<DialogType[]>`
        SELECT
            u.id AS "userId",
            u.nickname,
            u.avatar,
            lm.id AS "lastMessageId",
            lm.text AS "lastMessageText",
            lm."sender_id" AS "lastMessageSenderId",
            lm."recipient_id" AS "lastMessageRecipientId",
            lm."createdAt" AS "lastMessageCreatedAt",
            lm."updatedAt" AS "lastMessageUpdatedAt",
            lm."isRead" AS "lastMessageIsRead",
            COUNT(CASE WHEN m."recipient_id" = ${currentUserId} AND m."isRead" = FALSE THEN 1 END) AS "newMessagesCount"
        FROM
            users u
            LEFT JOIN LATERAL (
                SELECT
                    m.*
                FROM
                    messages m
                WHERE
                    (m."sender_id" = u.id AND m."recipient_id" = ${currentUserId})
                    OR (m."recipient_id" = u.id AND m."sender_id" = ${currentUserId})
                ORDER BY
                    m."createdAt" DESC
                LIMIT 1
            ) lm ON TRUE
            LEFT JOIN messages m ON (
                (m."sender_id" = u.id AND m."recipient_id" = ${currentUserId})
                OR (m."recipient_id" = u.id AND m."sender_id" = ${currentUserId})
            )
        WHERE
            u.id = ${friendId}
        GROUP BY
            u.id, lm.id, lm.text, lm."sender_id", lm."recipient_id", lm."createdAt", lm."updatedAt", lm."isRead"
        ORDER BY
            lm."createdAt" DESC;
    `;

    return this.formatData(result);
  }

  formatData(data: DialogType[]) {
    return data.reduce((acc, current) => {
      const { userId, ...rest } = current;
      acc[userId] = {
        user: {
          nickname: rest.nickname,
          avatar: rest.avatar
        },
        lastMessage: rest.lastMessageId
          ? {
              id: rest.lastMessageId,
              text: rest.lastMessageText,
              recipientId: rest.lastMessageRecipientId,
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

    // return {
    //   [userId]: {
    //     user: {
    //       nickname: data.nickname,
    //       avatar: data.avatar
    //     },
    //     lastMessage: data.lastMessageId
    //       ? {
    //           id: data.lastMessageId,
    //           text: data.lastMessageText,
    //           recipientId: data.lastMessageRecipientId,
    //           senderId: data.lastMessageSenderId,
    //           createdAt: data.lastMessageCreatedAt,
    //           updatedAt: data.lastMessageUpdatedAt,
    //           isRead: data.lastMessageIsRead
    //         }
    //       : null,
    //     newMessagesCount: Number(data.newMessagesCount)
    //   }
    // };
  }
}
