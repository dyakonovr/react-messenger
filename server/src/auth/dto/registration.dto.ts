import { IsNumber, IsOptional, IsString } from "class-validator";

export class RegistrationDto {
  @IsString()
  nickname: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  role_id: number;
}
