import type { FriendsPageUsersType } from "@/src/services/friend/type";
import { friendsPageUsersTypesArray } from "@/src/services/friend/type";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  QUERY_KEYS_FRIENDS_PAGE_DATA,
  URL_ATTRIBUTE_FRIENDSHIP_TYPE
} from "../../../../constants";

export const useFriendsHeaderFilters = () => {
  const queryClient = useQueryClient();
  const [activeType, setActiveType] = useQueryState(
    URL_ATTRIBUTE_FRIENDSHIP_TYPE,
    parseAsStringLiteral(friendsPageUsersTypesArray).withDefault("friends")
  );

  // Functions
  function changeFriendsFilter(type: FriendsPageUsersType) {
    setActiveType(type);
    queryClient.removeQueries({
      queryKey: [QUERY_KEYS_FRIENDS_PAGE_DATA, type]
    });
  }
  // Functions END

  return {
    changeFriendsFilter,
    activeType
  };
};
