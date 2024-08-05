import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Res,
  Get,
  UseGuards,
  Req,
  HttpCode
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { IToken, IUserReponse } from "./dto/auth-response.dto";
import { Request, Response } from "express";
import { Tokens } from "src/utils/enums/tokens.enum";
import { RefreshTokensGuard } from "src/utils/guards/refresh-tokens.guard";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  DEFAULT_ACCESS_TOKEN_MAX_AGE: number = 1000 * 60 * 15; // 15 minutes
  DEFAULT_REFRESH_TOKEN_MAX_AGE: number = 1000 * 60 * 60 * 24 * 7; // 7 days

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const responseData = await this.authService.login(dto);
    this.setTokensInCookie(response, responseData.accessToken, responseData.refreshToken);
    return responseData.user;
  }

  @Post("registration")
  @UsePipes(new ValidationPipe())
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<IUserReponse> {
    const responseData = await this.authService.registration(dto);
    this.setTokensInCookie(response, responseData.accessToken, responseData.refreshToken);
    return responseData.user;
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Tokens.ACCESS_TOKEN, { path: "/" });
    res.clearCookie(Tokens.REFRESH_TOKEN, { path: "/" });
    res.status(200).send();
  }

  @Get("tokens")
  @UseGuards(RefreshTokensGuard)
  async findAll(
    @Req() req: Request & { user: IUserReponse },
    @Res({ passthrough: true }) res: Response
  ) {
    const responseData = await this.authService.findById(req.user.id);
    this.setTokensInCookie(res, responseData.accessToken, responseData.refreshToken);
    return responseData.user;
  }

  setTokensInCookie(response: Response, accessToken: IToken, refreshToken: IToken) {
    response.cookie(Tokens.ACCESS_TOKEN, accessToken.token, {
      httpOnly: true,
      path: "/",
      maxAge: !isNaN(+accessToken.expiresIn)
        ? +accessToken.expiresIn
        : this.DEFAULT_ACCESS_TOKEN_MAX_AGE
    });

    response.cookie(Tokens.REFRESH_TOKEN, refreshToken.token, {
      httpOnly: true,
      path: "/",
      maxAge: !isNaN(+refreshToken.expiresIn)
        ? +refreshToken.expiresIn
        : this.DEFAULT_REFRESH_TOKEN_MAX_AGE
    });
  }
}
