import FriendItem from "./Item";
import classes from "./styles.module.css";

export function FriendsList() {
  return (
    <div className={classes.friends_list}>
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
    </div>
  );
}
