import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Observable } from "rxjs";
import { Tokens } from "../enums/tokens.enum";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[Tokens.ACCESS_TOKEN] as string;

    if (!accessToken) {
      return false;
    }

    const [bearer, token] = accessToken.split(" ");

    if (bearer !== "Bearer" || !token) {
      console.log("bearer !== Bearer || !token");
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
