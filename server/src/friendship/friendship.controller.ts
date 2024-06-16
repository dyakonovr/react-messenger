import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  HttpCode,
  ValidationPipe
} from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { FriendshipRequestDto } from "./dto/create-request.dto";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { RequestWithUser } from "src/utils/types/request-with-user.type";

@Controller("friendship")
export class FriendshipController {
  constructor(private readonly friendService: FriendshipService) {}

  @Get("create")
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createRequest(
    @Query(new ValidationPipe({ transform: true })) query: FriendshipRequestDto,
    @Req() req: RequestWithUser
  ) {
    this.friendService.createRequest(req.user.id, query.userId);
    return { message: "Friendship request is sent!" };
  }

  @Get("accept")
  @UseGuards(AuthGuard)
  @HttpCode(202)
  acceptRequest(
    @Query(new ValidationPipe({ transform: true })) query: FriendshipRequestDto,
    @Req() req: RequestWithUser
  ) {
    this.friendService.acceptRequest(req.user.id, query.userId);
    return { message: "Friendship request is accepted!" };
  }

  @Get("cancel")
  @UseGuards(AuthGuard)
  cancelRequest(
    @Query(new ValidationPipe({ transform: true })) query: FriendshipRequestDto,
    @Req() req: RequestWithUser
  ) {
    this.friendService.cancelRequest(req.user.id, query.userId);
    return { message: "Friendship request is canceled!" };
  }

  @Get("delete")
  @UseGuards(AuthGuard)
  deleteRequest(
    @Query(new ValidationPipe({ transform: true })) query: FriendshipRequestDto,
    @Req() req: RequestWithUser
  ) {
    this.friendService.deleteRequest(req.user.id, query.userId);
    return { message: "Friendship request is deleted!" };
  }
}
