import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { hash, verify } from "argon2";
import { RegistrationDto } from "./dto/registration.dto";
import { generateJWT } from "./utils/generate-jwt.helper";
import { IJwtPayload, IJwtTokens } from "./types/jwt.types";
import { AuthReponseDto } from "./dto/auth-response.dto";
import { pick } from "./utils/pick";
import { Tokens } from "src/utils/enums/tokens.enum";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(dto: LoginDto): Promise<AuthReponseDto> {
    const existUser = await this.userService.findByLogin(dto.login);
    if (!existUser) throw new NotFoundException(`User with login '${dto.login}' not found`);
    if (!verify(existUser.password, dto.password))
      throw new UnauthorizedException("Invalid login or password");

    const newTokens = this.getNewTokens({
      id: existUser.id,
      nickname: existUser.nickname
    });

    return new AuthReponseDto(
      pick(existUser, "id", "nickname", "avatar"),
      { token: newTokens.accessToken, expiresIn: String(1000 * 60 * 15) },
      { token: newTokens.refreshToken, expiresIn: String(1000 * 60 * 60 * 24 * 7) }
    );
  }

  async registration(dto: RegistrationDto): Promise<AuthReponseDto> {
    const passwordHash = await hash(dto.password);

    const user = await this.userService.create({
      ...dto,
      password: passwordHash
    });

    const newTokens = this.getNewTokens({
      id: user.id,
      nickname: user.nickname
    });

    return new AuthReponseDto(
      pick(user, "id", "nickname", "avatar"),
      { token: newTokens.accessToken, expiresIn: String(1000 * 60 * 15) },
      { token: newTokens.refreshToken, expiresIn: String(1000 * 60 * 60 * 24 * 7) }
    );
  }

  async findById(id: number): Promise<AuthReponseDto> {
    const user = await this.userService.findById(id);

    const newTokens = this.getNewTokens({
      id: user.id,
      nickname: user.nickname
    });

    return new AuthReponseDto(
      pick(user, "id", "nickname", "avatar"),
      { token: newTokens.accessToken, expiresIn: String(1000 * 60 * 15) },
      { token: newTokens.refreshToken, expiresIn: String(1000 * 60 * 60 * 24 * 7) }
    );
  }

  getNewTokens(
    payload: IJwtPayload,
    accessTokenExpiresIn: string = "15m",
    refreshTokenExpiresIn: string = "7d"
  ): IJwtTokens {
    return {
      [Tokens.ACCESS_TOKEN]: `Bearer ${generateJWT(payload, accessTokenExpiresIn)}`,
      [Tokens.REFRESH_TOKEN]: `Bearer ${generateJWT(payload, refreshTokenExpiresIn)}`
    };
  }
}
