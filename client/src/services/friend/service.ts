import { customFetch } from "../_core/fetch";
import { friendsPageUserSchema } from "../../types/features/friend";
import { getPaginationSchema } from "../../types/features/pagination";
import type { IRequestFilters } from "../../types/general/paginationOptions";
import { validateTypes } from "../_core/validateTypes";
import type { FriendsPageUsersType } from "./type";
import { createUrlParamsFromObject } from "../_core/createUrlParamsFromObject";

class FriendsService {
  private url = "friends";

  getAll = async (
    type: FriendsPageUsersType = "friends",
    requestFilters: IRequestFilters
  ) => {
    const params = createUrlParamsFromObject(requestFilters);
    const response = await customFetch(`${this.url}/${type}?${params}`);

    return validateTypes(getPaginationSchema(friendsPageUserSchema), response);
  };
}

export default new FriendsService();
