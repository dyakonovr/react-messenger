export interface ILoginRequest {
  login: string;
  password: string;
}

export interface IRegistrationRequest extends ILoginRequest {
  nickname: string;
}
