import type { IFriendsPageUser } from "@/src/types/features/friend";
import classes from "./styles.module.css";
import { FriendItem } from "./Item";
import type { FriendsPageUsersType } from "@/src/services/friend/type";

interface Props {
  data: IFriendsPageUser[];
  type: FriendsPageUsersType;
}

export function FriendsMainList({ data, type }: Props) {
  return (
    <div className={classes.friends_list}>
      {data.map((user) => (
        <FriendItem user={user} key={user.id} type={type} />
      ))}
    </div>
  );
}
