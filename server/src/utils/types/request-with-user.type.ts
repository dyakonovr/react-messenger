import { Request } from "express";
import { IUserReponse } from "src/auth/dto/auth-response.dto";

export type RequestWithUser = Request & { user: IUserReponse };
