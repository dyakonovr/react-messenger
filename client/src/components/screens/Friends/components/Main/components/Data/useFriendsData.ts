"use client";

import { typesArray, type FriendsPageUsersType } from "@/src/services/friend/type";
import FriendsService from "@/src/services/friend/service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

export const useFriendsData = () => {
  const [type] = useQueryState(
    "type",
    parseAsStringLiteral(typesArray).withDefault("friends")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [searchTerm] = useQueryState("searchTerm", parseAsString.withDefault(""));

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
    setPage(page);
  }
  // Functions END

  return { data, type, error, isLoading, setCurrentPage };
};
