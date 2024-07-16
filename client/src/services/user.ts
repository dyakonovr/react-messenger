import { customFetch } from "./fetch";
import type { UpdateAccountDataFormSchemaType } from "../components/screens/Settings/screens/AccountData/Form/constants";
import { userSchema } from "../types/features/user";
import { validateTypes } from "./validateTypes";

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
