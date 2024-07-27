import { PaginationRequestDto } from "src/utils/dto/pagination/request.dto";

export class PaginationWithSearchTermRequestDto extends PaginationRequestDto {
  searchTerm: string;
}
