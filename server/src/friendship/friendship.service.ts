import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FriendshipStatuses } from "@prisma/client";
import { ChatsService } from "src/chats/chats.service";

@Injectable()
export class FriendshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatService: ChatsService
  ) {}

  async createRequest(currentUserId: number, friendId: number) {
    return this.prisma.friendship.create({
      data: {
        inviter_id: currentUserId,
        accepter_id: friendId
      }
    });
  }

  async acceptRequest(currentUserId: number, friendId: number) {
    // return await this.prisma.friendship.update({
    //   where: {
    //     inviter_id_accepter_id: {
    //       accepter_id: currentUserId,
    //       inviter_id: friendId
    //     }
    //   },
    //   data: {
    //     status: FriendshipStatuses.REQUEST_ACCEPTED
    //   }
    // });

    return await this.prisma.$transaction(async (prisma) => {
      await this.chatService.create([currentUserId, friendId]);

      return await prisma.friendship.update({
        where: {
          inviter_id_accepter_id: {
            accepter_id: currentUserId,
            inviter_id: friendId
          }
        },
        data: {
          status: FriendshipStatuses.REQUEST_ACCEPTED
        }
      });
    });
  }

  async cancelRequest(currentUserId: number, friendId: number) {
    // return await this.prisma.friendship.delete({
    //   where: {
    //     inviter_id_accepter_id: {
    //       inviter_id: currentUserId,
    //       accepter_id: friendId
    //     }
    //   }
    // });

    return await this.prisma.$transaction(async (prisma) => {
      await this.chatService.deleteByUserIds([currentUserId, friendId]);

      return await prisma.friendship.delete({
        where: {
          inviter_id_accepter_id: {
            inviter_id: currentUserId,
            accepter_id: friendId
          }
        }
      });
    });
  }

  async deleteRequest(currentUserId: number, friendId: number) {
    return await this.prisma.$queryRaw`
      WITH friendship_check AS (
      SELECT inviter_id, accepter_id
      FROM friendships
      WHERE (inviter_id = ${currentUserId} AND accepter_id = ${friendId})
        OR (inviter_id = ${friendId} AND accepter_id = ${currentUserId})
    )
    UPDATE friendships SET
      inviter_id = ${friendId},
      accepter_id = ${currentUserId},
      status = ${FriendshipStatuses.REQUEST_SENT}
    FROM friendship_check
    WHERE (friendships.inviter_id = friendship_check.inviter_id AND friendships.accepter_id = friendship_check.accepter_id)
      OR (friendships.inviter_id = friendship_check.accepter_id AND friendships.accepter_id = friendship_check.inviter_id);
        `;
  }
}
