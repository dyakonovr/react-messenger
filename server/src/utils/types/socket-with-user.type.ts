import { Socket } from "socket.io";
import { IUserReponse } from "src/auth/dto/auth-response.dto";

export type SocketWithUser = Socket & { user: IUserReponse };
