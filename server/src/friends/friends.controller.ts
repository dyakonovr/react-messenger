import { FriendsService } from "./friends.service";

import { Controller, Get, UseGuards, Req, Query } from "@nestjs/common";
import { PaginationWithSearchTermRequestDto } from "src/utils/dto/pagination-with-search-term.dto";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { RequestWithUser } from "src/utils/types/request-with-user.type";

@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get("/friends")
  @UseGuards(AuthGuard)
  findAllFriends(
    @Req() req: RequestWithUser,
    @Query() requestDto: PaginationWithSearchTermRequestDto
  ) {
    return this.friendsService.findAllFriends(req.user.id, requestDto);
  }

  @Get("/all")
  @UseGuards(AuthGuard)
  findAll(
    @Req() req: RequestWithUser,
    @Query() requestDto: PaginationWithSearchTermRequestDto
  ) {
    console.log(requestDto);
    return this.friendsService.findAll(req.user.id, requestDto);
  }

  @Get("/received")
  @UseGuards(AuthGuard)
  findAllReceivedRequests(
    @Req() req: RequestWithUser,
    @Query() requestDto: PaginationWithSearchTermRequestDto
  ) {
    return this.friendsService.findReceivedRequests(req.user.id, requestDto);
  }

  @Get("/sent")
  @UseGuards(AuthGuard)
  findAllSentRequests(
    @Req() req: RequestWithUser,
    @Query() requestDto: PaginationWithSearchTermRequestDto
  ) {
    return this.friendsService.findSentRequests(req.user.id, requestDto);
  }
}
