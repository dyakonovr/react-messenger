import { useUrlParamsContext } from "@/src/providers/UrlParamProvider/provider";
import type { FriendsPageUsersType } from "@/src/services/friend";
import { useQueryClient } from "@tanstack/react-query";

export const useFriendsFilter = () => {
  const queryClient = useQueryClient();
  const { setParams, getParamValue } = useUrlParamsContext();
  const activeType: FriendsPageUsersType =
    (getParamValue("type") as FriendsPageUsersType) ?? "friends";

  // Functions
  function changeFriendsFilter(type: FriendsPageUsersType) {
    setParams({ type });
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
