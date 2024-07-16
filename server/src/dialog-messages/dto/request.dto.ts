import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { PaginationRequestDto } from "src/utils/pagination/request.dto";

export class DialogMessagesRequestDto extends PaginationRequestDto {
  @IsNumber()
  @Type(() => Number)
  chatId: number;
}
