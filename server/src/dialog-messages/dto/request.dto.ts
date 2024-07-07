import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { PaginationRequestDto } from "src/utils/pagination/request.dto";

export class DialogMessagesRequestDto extends PaginationRequestDto {
  @IsNumber()
  @Type(() => Number)
  friendId: number;
}
