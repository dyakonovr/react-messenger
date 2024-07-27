import { customFetch } from "./_core/fetch";
import type { ILoginRequest, IRegistrationRequest } from "../types/features/auth";
import { userSchema } from "../types/features/user";
import { validateTypes } from "./_core/validateTypes";

class AuthService {
  private url = "auth";

  login = async (data: ILoginRequest) => {
    const response = await customFetch(`${this.url}/login`, {
      cache: "no-cache",
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return validateTypes(userSchema, response);
  };

  registration = async (data: IRegistrationRequest) => {
    const response = await customFetch(`${this.url}/registration`, {
      cache: "no-cache",
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return validateTypes(userSchema, response);
  };

  logout = async () => {
    return await customFetch(`${this.url}/logout`, {
      cache: "no-cache",
      method: "POST"
    });
  };

  getNewTokens = async () => {
    const response = await customFetch(`${this.url}/tokens`, {
      cache: "no-cache"
    });

    return validateTypes(userSchema, response);
  };
}

export default new AuthService();
