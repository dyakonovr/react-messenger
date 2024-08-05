import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";
import { PaginationRequestDto } from "src/utils/dto/pagination/request.dto";

export class DialogMessagesRequestDto extends PaginationRequestDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  chatId: number;
}
