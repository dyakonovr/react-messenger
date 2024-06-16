import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class FriendshipRequestDto {
  @IsInt()
  @Type(() => Number)
  userId: number;
}
