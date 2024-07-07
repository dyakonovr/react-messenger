import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { DialogMessagesService } from "./dialog-messages.service";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { RequestWithUser } from "src/utils/types/request-with-user.type";
import { DialogMessagesRequestDto } from "./dto/request.dto";

@Controller("dialog-messages")
export class DialogMessagesController {
  constructor(private readonly dialogMessagesService: DialogMessagesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: RequestWithUser, @Query() requestDto: DialogMessagesRequestDto) {
    return this.dialogMessagesService.findAll(req.user.id, requestDto);
  }
}
