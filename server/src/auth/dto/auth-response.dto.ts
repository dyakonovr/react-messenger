interface IUserSettings {
  theme: string;
  language: string;
}

export interface IUserReponse {
  id: number;
  nickname: string;
  avatar?: string;
  // settings: IUserSettings;
}

export interface IToken {
  token: string;
  expiresIn: string;
}

export class AuthReponseDto {
  user: IUserReponse;
  accessToken: IToken;
  refreshToken: IToken;

  constructor(user: IUserReponse, accessToken: IToken, refreshToken: IToken) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
