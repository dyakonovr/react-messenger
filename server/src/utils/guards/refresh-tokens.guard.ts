import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Observable } from "rxjs";
import { Tokens } from "../enums/tokens.enum";

@Injectable()
export class RefreshTokensGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[Tokens.REFRESH_TOKEN] as string;

    if (!refreshToken) {
      return false;
    }

    const [bearer, token] = refreshToken.split(" ");

    if (bearer !== "Bearer" || !token) {
      return false;
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET_KEY);
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
