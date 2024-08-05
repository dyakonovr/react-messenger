import { IsString } from "class-validator";
import { PaginationRequestDto } from "src/utils/dto/pagination/request.dto";

export class PaginationWithSearchTermRequestDto extends PaginationRequestDto {
  @IsString()
  searchTerm: string;
}
