import type { IFriendsPageUser } from "@/src/types/features/user";
import FriendItem from "./Item";
import classes from "./styles.module.css";

export function FriendsList({ users }: { users: IFriendsPageUser[] }) {
  return (
    <div className={classes.friends_list}>
      {users.map((user) => (
        <FriendItem user={user} key={user.id} />
      ))}
    </div>
  );
}
