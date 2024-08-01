import type { IFriendsPageUser } from "@/src/types/features/friend";
import { Typography } from "@/src/components/ui";
import type { Nullable } from "@/src/types/general/nullable";
import {
  FriendsListEmptyDataBlock,
  FriendsListDataError,
  FriendsMainList
} from "./components";
import type { FriendsPageUsersType } from "@/src/services/friend/type";

interface IProps {
  isLoading: boolean;
  data: IFriendsPageUser[];
  error: Nullable<Error>;
  type: FriendsPageUsersType;
}

export function FriendsMainData({ isLoading, data, error, type }: IProps) {
  const isDataSuccessResponse = !isLoading && !error;
  const isDataEmpty = isDataSuccessResponse && data.length === 0;
  const isDataShowed = isDataSuccessResponse && !!data.length;

  return (
    <>
      {isDataEmpty && <FriendsListEmptyDataBlock key="isDataEmpty" />}
      {isLoading && (
        <Typography variant="subtitle" key="isLoading">
          Loading...
        </Typography>
      )}
      {isDataShowed && <FriendsMainList data={data} type={type} key="isDataShowed" />}
      {error && <FriendsListDataError error={error} key="Error" />}
    </>
  );
}
