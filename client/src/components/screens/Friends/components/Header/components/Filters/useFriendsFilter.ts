import type { FriendsPageUsersType } from "@/src/services/friend/type";
import { typesArray } from "@/src/services/friend/type";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export const useFriendsFilter = () => {
  const queryClient = useQueryClient();
  const [activeType, setActiveType] = useQueryState(
    "type",
    parseAsStringLiteral(typesArray).withDefault("friends")
  );

  // Functions
  function changeFriendsFilter(type: FriendsPageUsersType) {
    setActiveType(type);
    queryClient.removeQueries({
      queryKey: ["friends", type]
    });
  }
  // Functions END

  return {
    changeFriendsFilter,
    activeType
  };
};
