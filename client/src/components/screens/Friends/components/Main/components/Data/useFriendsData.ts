"use client";

import { friendsPageUsersTypesArray } from "@/src/services/friend/type";
import FriendsService from "@/src/services/friend/service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import {
  QUERY_KEYS_FRIENDS_PAGE_DATA,
  URL_ATTRIBUTE_FRIENDSHIP_TYPE,
  URL_ATTRIBUTE_PAGE,
  URL_ATTRIBUTE_SEARCH_TERM
} from "../../../../constants";

export const useFriendsData = () => {
  const [type] = useQueryState(
    URL_ATTRIBUTE_FRIENDSHIP_TYPE,
    parseAsStringLiteral(friendsPageUsersTypesArray).withDefault("friends")
  );
  const [page, setPage] = useQueryState(
    URL_ATTRIBUTE_PAGE,
    parseAsInteger.withDefault(1)
  );
  const [searchTerm] = useQueryState(
    URL_ATTRIBUTE_SEARCH_TERM,
    parseAsString.withDefault("")
  );

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS_FRIENDS_PAGE_DATA, type, page, searchTerm],
    queryFn: () =>
      FriendsService.getAll(type, {
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
