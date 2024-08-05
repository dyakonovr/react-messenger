import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PaginationRequestDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;
}
