import type { FriendsPageUsersType } from "@/src/services/friend/type";
import type { FriendshipRequestType } from "@/src/services/friendship/service";
import FriendshipService from "@/src/services/friendship/service";
import type { Nullable } from "@/src/types/general/nullable";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const getNeccesaryType = (
  type: FriendsPageUsersType
): Nullable<FriendshipRequestType> => {
  switch (true) {
    case type === "all":
      return "create";
    case type === "sent":
      return "cancel";
    case type === "received":
      return "accept";
    case type === "friends":
      return "delete";
    default:
      return null;
  }
};

export const useFriendsRequestFunc = (userId: number, type: FriendsPageUsersType) => {
  const requestType: FriendshipRequestType | null = getNeccesaryType(type);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!requestType) return Promise.reject(new Error("Invalid request type"));
      return FriendshipService.makeRequest(userId, requestType);
    },
    onSuccess({ data }) {
      if (!data) return;

      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [
          "friends",
          type,
          transformStringToNumber(searchParams.get("page") || "1")
        ]
      });
    },
    onError(error) {
      toast.success(error.message);
    }
  });

  return mutate;
};
