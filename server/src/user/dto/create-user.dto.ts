import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  login: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNumber()
  role_id: number;
}
