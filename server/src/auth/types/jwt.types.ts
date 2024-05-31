type Primitive = string | number | boolean;
export interface IJwtPayload {
  [key: string]: Primitive | Primitive[];
}

export interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}
