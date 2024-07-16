import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService, UserUpdateData } from "./user.service";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { RequestWithUser } from "src/utils/types/request-with-user.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileStorage } from "src/file/storage";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Put()
  // @UseGuards(AuthGuard)
  // findAllFriends(@Req() req: RequestWithUser, @Query() requestDto: unknown) {
  //   console.log("@id:", req.user.id);
  //   console.log("@req.file:", req.file);
  //   // @ts-ignore
  //   console.log("@req.data:", req.data);
  //   // return this.friendsService.findAllFriends(req.user.id, requestDto);
  // }

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: fileStorage
    })
  )
  update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
        fileIsRequired: false
      })
    )
    file: Express.Multer.File | undefined,
    @Req() req: RequestWithUser,
    @Body() body: Partial<UserUpdateData>
  ) {
    return this.userService.update(file, body, req.user.id);
  }
}
