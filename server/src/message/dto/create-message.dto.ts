import { IsNumber, IsString, Min } from "class-validator";

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  chatId: string;
}
