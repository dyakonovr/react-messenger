import { customFetch } from "../../api/fetch";
import { validateTypes } from "../validateTypes";
import { friendshipResponseSchema, type IFriendshipResponse } from "./response.type";

export type FriendshipRequestType = "create" | "cancel" | "delete" | "accept";

class FriendshipService {
  private url = "friendship";

  makeRequest = async (userId: number, request: FriendshipRequestType) => {
    const response = await customFetch<IFriendshipResponse>(
      `${this.url}/${request}?userId=${userId}`,
      {
        cache: "no-cache"
      }
    );

    return validateTypes(friendshipResponseSchema, response);
  };
}

export default new FriendshipService();
