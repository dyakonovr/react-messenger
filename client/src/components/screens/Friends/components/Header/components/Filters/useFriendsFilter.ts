import type { FriendsPageUsersType } from "@/src/services/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export const useFriendsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const changeFriendsFilter = (type: FriendsPageUsersType) => {
    const queryParams = new URLSearchParams();
    queryParams.set("type", type);
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
    queryClient.removeQueries({
      queryKey: ["friends", type]
    });
  };

  return {
    changeFriendsFilter,
    activeType: (searchParams.get("type") as FriendsPageUsersType) ?? "friends"
  };
};
