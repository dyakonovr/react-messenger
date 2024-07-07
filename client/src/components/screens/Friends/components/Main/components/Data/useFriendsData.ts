"use client";

import type { FriendsPageUsersType } from "@/src/services/friend";
import FriendsService from "@/src/services/friend";
import { useSearchParams } from "next/navigation";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";
import { useAddUrlAttribute } from "@/src/hooks/general/useAddUrlAttribute";
import { useQuery } from "@tanstack/react-query";

export const useFriendsData = () => {
  const searchParams = useSearchParams();
  const type: FriendsPageUsersType =
    (searchParams.get("type") as FriendsPageUsersType) ?? "friends";
  const page: number = transformStringToNumber(searchParams.get("page") ?? "1");
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["friends", type, page, searchTerm],
    queryFn: () =>
      FriendsService.getAll(type as FriendsPageUsersType, {
        page,
        limit: 24,
        searchTerm
      }),
    select: ({ data }) => data,
    staleTime: Infinity
  });

  const addUrlAttribute = useAddUrlAttribute();

  // Functions
  function setCurrentPage(newPage: number) {
    if (newPage === page) return;
    addUrlAttribute("page", newPage);
  }
  // Functions END

  return { data, type, error, isLoading, setCurrentPage };
};
