import { ISearchUser } from "../../../interfaces/ISearchUser";
import classes from './UserSearchItem.module.scss';

interface IUserSearchItemProps {
  user: ISearchUser
}

function UserSearchItem({user}: IUserSearchItemProps) {
  return (
    <li className={classes.user_search_item} data-id={user._id}>
      <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" />
      <div className={classes.user_search_item_wrapper}>
        <strong className="name">{user.login}</strong>
        <span className={classes.user_search_item_email}>{user.email}</span>
      </div>
      <button className={classes.user_search_item_button}>+</button>
    </li>
  );
};

export default UserSearchItem;