"use client";

import type { IFriendsPageUser } from "@/src/types/features/friend";
import { useCallback, useEffect, useState } from "react";
import type { FriendsPageUsersType } from "@/src/services/user";
import FriendsService from "@/src/services/user";
import { useSearchParams } from "next/navigation";
import type { PaginationType } from "@/src/types/features/pagination";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";
import { useAddUrlAttribute } from "@/src/hooks/useAddUrlAttribute";
import { useQuery } from "@tanstack/react-query";

const initialState: PaginationType<IFriendsPageUser[]> = {
  currentPage: 0,
  totalPages: 0,
  items: []
};

export const useFriendsData = () => {
  const searchParams = useSearchParams();
  const type: FriendsPageUsersType =
    (searchParams.get("type") as FriendsPageUsersType) ?? "friends";
  const page: number = transformStringToNumber(searchParams.get("page") ?? "1");
  const searchTerm = searchParams.get("searchTerm") ?? "";

  console.log("@type", type);

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

  // const [data, setData] = useState<PaginationType<IFriendsPageUser[]>>(defaultState);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   getFriendsData();
  // }, [type, page]);

  // const getFriendsData = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     const allUsers = await UserService.getAll(type as FriendsPageUserRequestType, {
  //       page,
  //       limit: 24
  //     });
  //     setData(allUsers.data);
  //   } catch (error) {
  //     setError(error as Error);
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [page, type]);

  const addUrlAttribute = useAddUrlAttribute();

  // Functions
  function setCurrentPage(newPage: number) {
    if (newPage === page) return;
    addUrlAttribute("page", newPage);
  }
  // Functions END

  return { data, type, error, isLoading, setCurrentPage };
};
