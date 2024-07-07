import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Tokens } from "../enums/tokens.enum";
import { Socket } from "socket.io";

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const accessToken = client.handshake.headers.cookie
      ?.split("; ")
      .find((cookie) => cookie.startsWith(`${Tokens.ACCESS_TOKEN}=`))
      ?.split("=")[1];

    if (!accessToken) {
      return false;
    }

    const [bearer, token] = accessToken.split("%20");

    if (bearer !== "Bearer" || !token) {
      return false;
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET_KEY);
      client["user"] = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
