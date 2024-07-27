"use client";

import type { FriendsPageUsersType } from "@/src/services/friend";
import FriendsService from "@/src/services/friend";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";
import { useQuery } from "@tanstack/react-query";
import { useUrlParams } from "@/src/hooks/general/useUrlParams";

type UrlParams = {
  page: string;
  type: FriendsPageUsersType;
  searchTerm: string;
};

export const useFriendsData = () => {
  const { setParams, getParamValue } = useUrlParams<UrlParams>();

  const type: FriendsPageUsersType =
    (getParamValue("type") as FriendsPageUsersType) ?? "friends";
  const page: number = transformStringToNumber(getParamValue("page") ?? "1");
  const searchTerm = getParamValue("searchTerm") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["friends", type, page, searchTerm],
    queryFn: () =>
      FriendsService.getAll(type as FriendsPageUsersType, {
        page,
        limit: 24,
        searchTerm
      }),
    select: ({ data }) => data
  });

  // Functions
  function setCurrentPage(newPage: number) {
    if (newPage === page) return;
    setParams({ page: String(newPage) });
  }
  // Functions END

  return { data, type, error, isLoading, setCurrentPage };
};
