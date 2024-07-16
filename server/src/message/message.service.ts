import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { PrismaService } from "src/prisma.service";
import { DialogsService } from "src/dialogs/dialogs.service";

@Injectable()
export class MessageService {
  // constructor(
  //   private readonly prisma: PrismaService,
  //   private readonly dialogService: DialogsService
  // ) {}

  // async create(userId: number, dto: CreateMessageDto) {
  //   await this.prisma.message.create({
  //     data: {
  //       text: dto.text,
  //       sender_id: userId,
  //       chat_id: +dto.chatId
  //     }
  //   });

  //   const myDialog = await this.dialogService.findOne(userId, +dto.friendId);
  //   const friendDialog = await this.dialogService.findOne(+dto.friendId, userId);

  //   return { myDialog, friendDialog };
  // }

  // async markAsRead(messageIds: string[]) {
  //   return await this.prisma.$transaction(async (prisma) => {
  //     const newMessageIds = messageIds.map((el) => +el);

  //     // Найти все сообщения, которые нужно обновить
  //     const messagesToUpdate = await prisma.message.findMany({
  //       where: {
  //         id: { in: newMessageIds },
  //         is_read: false
  //       },
  //       select: {
  //         id: true,
  //         sender_id: true,
  //         chat_id: true,
  //         created_at: true
  //       }
  //     });

  //     const maxDate = messagesToUpdate.reduce(
  //       (max, msg) => (msg.created_at > max ? msg.created_at : max),
  //       messagesToUpdate[0].created_at
  //     );

  //     // Обновить все сообщения, установив isRead = true
  //     await prisma.message.updateMany({
  //       where: {
  //         OR: [
  //           { id: { in: newMessageIds } }, // Обновляем указанные сообщения
  //           {
  //             // Обновляем предыдущие непрочитанные сообщения в тех же диалогах
  //             is_read: false,
  //             // sender_id: { in: messagesToUpdate.map((msg) => msg.sender_id) },
  //             chat_id: { in: messagesToUpdate.map((msg) => msg.chat_id) },
  //             created_at: { lt: maxDate } // Используем createdAt текущих сообщений
  //           }
  //         ]
  //       },
  //       data: {
  //         is_read: true
  //       }
  //     });

  //     // Вернуть массив обновленных сообщений
  //     return messagesToUpdate.length !== 0
  //       ? {
  //           data: messagesToUpdate.map((msg) => ({
  //             senderId: msg.sender_id,
  //             recipientId: msg.recipient_id,
  //             id: msg.id
  //           })),
  //           recipientId: messagesToUpdate[0].recipient_id,
  //           senderId: messagesToUpdate[0].sender_id
  //         }
  //       : {
  //           data: null,
  //           senderId: null,
  //           recipientId: null
  //         };
  //   });
  // }
}
