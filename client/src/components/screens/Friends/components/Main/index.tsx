"use client";

import { FriendsMainData, FriendsPagination } from "./components";
import { useFriendsData } from "./components/Data/useFriendsData";

export function FriendsMain() {
  const { data, type, isLoading, error, setCurrentPage } = useFriendsData();
  const isPaginationShowed =
    data?.currentPage !== 0 && (data?.totalPages || 0) > 1 && !isLoading;

  return (
    <>
      <FriendsMainData
        data={data?.items || []}
        isLoading={isLoading}
        error={error}
        type={type}
      />
      {isPaginationShowed && (
        <FriendsPagination
          currentPage={data?.currentPage || 0}
          totalPages={data?.totalPages || 0}
          onClick={setCurrentPage}
        />
      )}
    </>
  );
}
