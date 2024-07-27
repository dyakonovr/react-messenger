import { customFetch } from "./_core/fetch";
import { userSchema } from "../types/features/user";
import { validateTypes } from "./_core/validateTypes";

class UserService {
  private url = "user";

  update = async (data: FormData) => {
    const response = await customFetch(this.url, {
      body: data,
      method: "PUT"
    });
    return validateTypes(userSchema, response);
  };
}

export default new UserService();
