import { sign } from "jsonwebtoken";
import { IJwtPayload } from "../types/jwt.types";

export function generateJWT(payload: IJwtPayload, expiresIn: string) {
  return sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
}
