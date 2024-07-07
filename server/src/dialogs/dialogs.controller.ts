import { Controller, Get, UseGuards, Req, Query } from "@nestjs/common";
import { DialogsService } from "./dialogs.service";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { RequestWithUser } from "src/utils/types/request-with-user.type";
import { PaginationRequestDto } from "src/utils/pagination/request.dto";

@Controller("dialogs")
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: RequestWithUser, @Query() requestDto: PaginationRequestDto) {
    return this.dialogsService.findAll(req.user.id, requestDto);
  }
}
