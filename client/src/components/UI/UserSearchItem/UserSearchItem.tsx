import { IFriend } from "../../../interfaces/IFriend";
import { addFriend } from "../../../services/UserService";
import { createToast } from "../../../utils/createToast";
import classes from './UserSearchItem.module.scss';

interface IUserSearchItemProps {
  user: IFriend,
  isAlreadyFriend: boolean
}

function UserSearchItem({ user, isAlreadyFriend }: IUserSearchItemProps) {
  // Функции
  async function handleClick() {
    const userSearchResponse: string = await addFriend(user._id);
    createToast(userSearchResponse);
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