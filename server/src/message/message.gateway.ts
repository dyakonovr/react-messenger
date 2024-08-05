import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket
} from "@nestjs/websockets";
import { MessageService } from "./message.service";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "./dto/create-message.dto";
import {
  ExecutionContext,
  Inject,
  UseFilters,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { WsAuthGuard } from "src/utils/guards/ws-auth.guard";
import { SocketWithUser } from "src/utils/types/socket-with-user.type";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ChatsService } from "src/chats/chats.service";
import { DialogsService } from "src/dialogs/dialogs.service";
import { ReadMessageDto } from "./dto/read-message.dto";
import { BadRequestTransformationFilter } from "./filter";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatsService,
    private readonly dialogService: DialogsService,
    private readonly wsAuthGuard: WsAuthGuard,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @UseGuards(WsAuthGuard)
  async handleConnection(client: Socket, ...args: any[]) {
    const isAuthenticated = this.wsAuthGuard.canActivate({
      switchToWs: () => ({
        getClient: () => client,
        getData: () => null
      })
    } as ExecutionContext);
    if (!isAuthenticated) {
      client.disconnect();
      console.log("Client disconnected due to failed authentication");
      return;
    }
    // If authenticated, save user id in cache
    const socketWithUser = client as SocketWithUser;
    if (socketWithUser.user && socketWithUser.user.id) {
      const oldSocketIds =
        ((await this.cacheManager.get(String(socketWithUser.user.id))) as string) || "[]";
      await this.cacheManager.set(
        String(socketWithUser.user.id),
        JSON.stringify([...JSON.parse(oldSocketIds), socketWithUser.id]),
        0
      );
      console.log(
        `User '${socketWithUser.user.nickname}' (ID: ${socketWithUser.user.id}) with socket ID ${socketWithUser.id} saved to cache.`
      );
    }
  }

  async handleDisconnect(client: any) {
    console.log("Disconnect");

    this.wsAuthGuard.canActivate({
      switchToWs: () => ({
        getClient: () => client,
        getData: () => null
      })
    } as ExecutionContext);

    // If authenticated, save user id in cache
    const socketWithUser = client as SocketWithUser;
    if (socketWithUser.user && socketWithUser.user.id) {
      await this.cacheManager.del(String(socketWithUser.user.id));

      // console.log(
      //   `User ID ${socketWithUser.user.id} with socket ID ${socketWithUser.id} deleted from cache.`
      // );
    }
    // this.server.emit("disconnect");
  }

  afterInit(server: any) {
    console.log("Messages Socket Init!");
  }

  @SubscribeMessage("MESSAGE:CREATE")
  @UseGuards(WsAuthGuard)
  @UseFilters(BadRequestTransformationFilter) // Иначе сервер падает при инвалидации данных
  async create(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody(new ValidationPipe()) payload: CreateMessageDto
  ) {
    const result = await this.messageService.create(client.user.id, payload);

    const userIds = await this.chatService.getChatParticipantsById(result.chat_id);
    userIds.forEach(async (obj) => {
      const dialog = await this.dialogService.findOne(result.chat_id, obj.user_id);
      this.emitToUser(obj.user_id, "MESSAGE:CREATED", dialog);
    });
  }

  @SubscribeMessage("MESSAGE:READ")
  @UseFilters(BadRequestTransformationFilter)
  @UseGuards(WsAuthGuard)
  async read(
    @ConnectedSocket() _client: SocketWithUser,
    @MessageBody(new ValidationPipe()) payload: ReadMessageDto
  ) {
    const updatedMessageIds = await this.messageService.markAsRead(payload);

    if (updatedMessageIds.length === 0) return;
    const userIds = await this.chatService.getChatParticipantsById(payload.chatId);
    userIds.forEach(async (obj) => {
      this.emitToUser(obj.user_id, "MESSAGE:READ", {
        messageIds: updatedMessageIds,
        chatId: payload.chatId,
        status: "success"
      });
    });
  }

  async emitToUser(userId: number | string, event: string, message: unknown) {
    try {
      const socketArray = JSON.parse(
        (await this.cacheManager.get<string>(String(userId))) || "[]"
      ) as string[];

      if (socketArray.length !== 0) {
        this.server.to(socketArray).emit(event, message);
      } else {
        console.log(`User with ID ${userId} not found in cache.`);
      }
    } catch (error) {
      console.log("Error before trying to emit: ", error);
    }
  }
}
