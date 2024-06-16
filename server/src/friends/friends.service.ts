import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FriendshipStatuses, User } from "@prisma/client";
import { UserRequestDto } from "./dto/request.dto";
import { PaginationResponseDto } from "src/utils/pagination/response.dto";

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async findAllFriends(
    currentUserId: number,
    requestDto: UserRequestDto
  ): Promise<PaginationResponseDto> {
    const offset = (requestDto.page - 1) * requestDto.limit;
    const searchQuery = requestDto.searchTerm ? `%${requestDto.searchTerm}%` : "%";

    const items = await this.prisma.$queryRaw<User[]>`
        SELECT
          u.id,
          u.nickname,
          u.avatar
        FROM
          users u
        WHERE EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.inviter_id = u.id
                      AND f.status::text = ${FriendshipStatuses.REQUEST_ACCEPTED}
                  )
                  OR (
                      f.accepter_id = u.id
                      AND f.status::text = ${FriendshipStatuses.REQUEST_ACCEPTED}
                  )
          )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const itemsCount = await this.prisma.$queryRaw<{ total: number }[]>`
      SELECT
        COUNT(*) as total
      FROM
          users u
        WHERE EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.inviter_id = u.id
                      AND f.status::text = ${FriendshipStatuses.REQUEST_ACCEPTED}
                  )
                  OR (
                      f.accepter_id = u.id
                      AND f.status::text = ${FriendshipStatuses.REQUEST_ACCEPTED}
                  )
          )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const totalItems = itemsCount[0].total;
    const totalPages = Math.ceil(Number(totalItems) / requestDto.limit);

    return new PaginationResponseDto(items, requestDto.page, totalPages);
  }

  async findAll(
    currentUserId: number,
    requestDto: UserRequestDto
  ): Promise<PaginationResponseDto> {
    const offset = (requestDto.page - 1) * requestDto.limit;
    const searchQuery = requestDto.searchTerm ? `%${requestDto.searchTerm}%` : "%";

    const items = await this.prisma.$queryRaw<User[]>`
        SELECT
          u.id,
          u.nickname,
          u.avatar
        FROM
          users u
        WHERE NOT EXISTS (
          SELECT 1
          FROM friendships f
          WHERE (f.inviter_id = ${currentUserId} AND f.accepter_id = u.id)
             OR (f.inviter_id = u.id AND f.accepter_id = ${currentUserId})
        )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const itemsCount = await this.prisma.$queryRaw<{ total: number }[]>`
      SELECT
        COUNT(*) as total
      FROM
          users u
        WHERE NOT EXISTS (
          SELECT 1
          FROM friendships f
          WHERE (f.inviter_id = ${currentUserId} AND f.accepter_id = u.id)
             OR (f.inviter_id = u.id AND f.accepter_id = ${currentUserId})
        )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
    `;

    const totalItems = itemsCount[0].total;
    const totalPages = Math.ceil(Number(totalItems) / requestDto.limit);

    return new PaginationResponseDto(items, requestDto.page, totalPages);
  }

  async findSentRequests(
    currentUserId: number,
    requestDto: UserRequestDto
  ): Promise<PaginationResponseDto> {
    const offset = (requestDto.page - 1) * requestDto.limit;
    const searchQuery = requestDto.searchTerm ? `%${requestDto.searchTerm}%` : "%";

    const items = await this.prisma.$queryRaw<User[]>`
        SELECT
          u.id,
          u.nickname,
          u.avatar
        FROM
          users u
        WHERE
          u.id <> ${currentUserId}
          AND EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.accepter_id = u.id
                      AND f.inviter_id = ${currentUserId}
                      AND f.status IN ('REQUEST_SENT')
                  )
          )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const itemsCount = await this.prisma.$queryRaw<{ total: number }[]>`
      SELECT
        COUNT(*) as total
      FROM
          users u
        WHERE
          u.id <> ${currentUserId}
          AND EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.accepter_id = u.id
                      AND f.inviter_id = ${currentUserId}
                      AND f.status IN ('REQUEST_SENT')
                  )
          )
        AND u.id <> ${currentUserId}
        AND u.nickname LIKE ${searchQuery}
    `;

    const totalItems = itemsCount[0].total;
    const totalPages = Math.ceil(Number(totalItems) / requestDto.limit);

    return new PaginationResponseDto(items, requestDto.page, totalPages);
  }

  async findReceivedRequests(
    currentUserId: number,
    requestDto: UserRequestDto
  ): Promise<PaginationResponseDto> {
    const offset = (requestDto.page - 1) * requestDto.limit;
    const searchQuery = requestDto.searchTerm ? `%${requestDto.searchTerm}%` : "%";

    const items = await this.prisma.$queryRaw<User[]>`
        SELECT
          u.id,
          u.nickname,
          u.avatar
        FROM
          users u
        WHERE
          u.id <> ${currentUserId}
          AND EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.accepter_id = ${currentUserId} 
                      AND f.inviter_id = u.id
                      AND f.status IN ('REQUEST_SENT')
                  )
          )
        AND u.nickname LIKE ${searchQuery}
        LIMIT ${requestDto.limit} OFFSET ${offset};
    `;

    const itemsCount = await this.prisma.$queryRaw<{ total: number }[]>`
      SELECT
        COUNT(*) as total
      FROM
          users u
        WHERE
          u.id <> ${currentUserId}
          AND EXISTS (
              SELECT 1
              FROM friendships f
              WHERE (
                      f.accepter_id = u.id
                      AND f.inviter_id = ${currentUserId}
                      AND f.status IN ('REQUEST_SENT')
                  )
          )
        AND u.nickname LIKE ${searchQuery}
    `;

    const totalItems = itemsCount[0].total;
    const totalPages = Math.ceil(Number(totalItems) / requestDto.limit);

    return new PaginationResponseDto(items, requestDto.page, totalPages);
  }
}
