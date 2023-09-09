import { useEffect, useState } from "react";
import { IFriend } from "../../interfaces/IFriend";
import { getUsers } from "../../services/UserService";
import { useFriendsStore } from "../../store/friendsStore";
import { createToast } from "../../utils/createToast";
import UserSearchItem from "../UI/UserSearchItem/UserSearchItem";
import classes from './UserSearch.module.scss';

function UserSearch() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<IFriend[]>([]);
  const friends = useFriendsStore(state => state.friends);
  const friendsIds = friends.map(friend => friend._id);

  useEffect(() => { 
    const searchUsers = setTimeout(async () => { 
      const searchResponse: IFriend[] | string = await getUsers(value);
      if (typeof searchResponse === "string") {
        createToast(searchResponse);
        return;
      }

      setSearchResults(searchResponse);
    }, 500);

    return () => clearTimeout(searchUsers);
  }, [value]);

  return (
    <div className={classes.user_search}>
      <div className={classes.user_search_header}>
        <h2 className="title">Add friend</h2>
        <input
          className="input"
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          value={value}
          placeholder="Type user login or email..."
          type="text"
        />
      </div>
      <ul className={classes.user_search_list}>
        {searchResults.map((obj, index) => <UserSearchItem user={obj} key={index} isAlreadyFriend={friendsIds.includes(obj._id)} />)}
      </ul>
    </div>
  );
};

export default UserSearch;