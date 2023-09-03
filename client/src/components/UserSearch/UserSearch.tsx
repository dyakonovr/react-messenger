import { useEffect, useState } from "react";
import axios from "../../axios";
import { IFriend } from "../../interfaces/IFriend";
import UserSearchItem from "../UI/UserSearchItem/UserSearchItem";
import classes from './UserSearch.module.scss';
import { ServerPaths } from "../../enums/ServerPaths";
import { useFriendsStore } from "../../store/friendsStore";

function UserSearch() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<IFriend[]>([]);
  const friends = useFriendsStore(state => state.friends);
  const friendsIds = friends.map(friend => friend._id);

  useEffect(() => { 
    const searchUsers = setTimeout(() => { 
      axios.post(ServerPaths.USERS.GET_USERS, { searchString: value }).then(response => setSearchResults(response.data));
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