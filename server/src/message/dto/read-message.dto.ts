import { IsArray, IsNumber } from "class-validator";

export class ReadMessageDto {
  @IsArray()
  @IsNumber()
  messageIds: number[];

  @IsNumber()
  chatId: number;
}
