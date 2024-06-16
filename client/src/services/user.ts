import { customFetch } from "../api/fetch";
import { friendsPageUserSchema } from "../types/features/friend";
import { getPaginationSchema } from "../types/features/pagination";
import type { IRequestFilters } from "../types/general/paginationOptions";
import { validateTypes } from "./validateTypes";

export type FriendsPageUsersType = "friends" | "all" | "sent" | "received";

class FriendsService {
  private url = "friends";

  getAll = async (
    type: FriendsPageUsersType = "friends",
    requestFilters: IRequestFilters
  ) => {
    const response = await customFetch(
      `${this.url}/${type}?page=${requestFilters.page}&limit=${requestFilters.limit}&searchTerm=${requestFilters.searchTerm}`
    );

    return validateTypes(getPaginationSchema(friendsPageUserSchema), response);
  };
}

export default new FriendsService();
