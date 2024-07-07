import { Transform, Type } from "class-transformer";
import { IsInt } from "class-validator";

export class PaginationRequestDto {
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 1)
  page: number;
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 20)
  limit: number;
}
