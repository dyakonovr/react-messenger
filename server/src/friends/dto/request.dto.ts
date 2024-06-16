import { PaginationRequestDto } from "src/utils/pagination/request.dto";

export class UserRequestDto extends PaginationRequestDto {
  searchTerm: string;
}
