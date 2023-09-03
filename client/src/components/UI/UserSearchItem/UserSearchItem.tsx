import axios from "../../../axios";
import { ServerPaths } from "../../../enums/ServerPaths";
import { IFriend } from "../../../interfaces/IFriend";
import { createToast } from "../../../utils/createToast";
import classes from './UserSearchItem.module.scss';

interface IUserSearchItemProps {
  user: IFriend,
  isAlreadyFriend: boolean
}

function UserSearchItem({ user, isAlreadyFriend }: IUserSearchItemProps) {
  // Функции
  async function handleClick() {
    axios.put(ServerPaths.USERS.ADD_FRIEND, { id: user._id })
      .then(response => createToast(response.data.message))
      .catch(error => createToast(error.response.data.message))
  }
  // Функции END

  return (
    <li className={classes.user_search_item} onClick={isAlreadyFriend ? undefined : handleClick}>
      {/* <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" /> */}
      <div className="avatar-placeholder">{user.login[0]}</div>
      <div className={classes.user_search_item_wrapper}>
        <strong className="name">{user.login}</strong>
        <span className={classes.user_search_item_email}>{user.email}</span>
      </div>
      {!isAlreadyFriend && <button className={classes.user_search_item_button}>+</button>}
    </li>
  );
};

export default UserSearchItem;