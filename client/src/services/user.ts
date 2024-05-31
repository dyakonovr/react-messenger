import { customFetch } from "../api/fetch";
import type { IFriendsPageUser } from "../types/features/user";

class UserService {
  private url = "user";

  getAll = async () => {
    return await customFetch<IFriendsPageUser[]>(this.url, {
      cache: "no-cache"
    });
  };
}

export default new UserService();
