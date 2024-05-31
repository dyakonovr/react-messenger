import { customFetch } from "../api/fetch";
import type { ILoginRequest, IRegistrationRequest } from "../types/features/auth";
import { userSchema, type IUser } from "../types/features/user";

class AuthService {
  private url = "auth";

  login = async (data: ILoginRequest) => {
    const response = await customFetch<IUser>(`${this.url}/login`, {
      cache: "no-cache",
      body: JSON.stringify(data),
      method: "POST"
    });

    const validationResult = userSchema.safeParse(response);
    if (!validationResult.success) throw new Error("Bad data in login response");

    return validationResult.data;
  };

  registration = async (data: IRegistrationRequest) => {
    const response = await customFetch<IUser>(`${this.url}/registration`, {
      cache: "no-cache",
      body: JSON.stringify(data),
      method: "POST"
    });

    const validationResult = userSchema.safeParse(response);
    if (!validationResult.success) throw new Error("Bad data in registration response");

    return validationResult.data;
  };

  logout = async () => {
    return await customFetch(`${this.url}/logout`, {
      cache: "no-cache",
      method: "POST"
    });
  };

  getNewTokens = async () => {
    const response = await customFetch<IUser>(`${this.url}/tokens`, {
      cache: "no-cache"
    });

    const validationResult = userSchema.safeParse(response);
    if (!validationResult.success) throw new Error("Bad data in GetNewTokens response");

    return validationResult.data;
  };
}

export default new AuthService();
