import { customFetch } from "../_core/fetch";
import { friendsPageUserSchema } from "../../types/features/friend";
import { getPaginationSchema } from "../../types/features/pagination";
import type { IRequestFilters } from "../../types/general/paginationOptions";
import { validateTypes } from "../_core/validateTypes";
import type { FriendsPageUsersType } from "./type";

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
