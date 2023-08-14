import { useState, useEffect } from "react";
import UserSearchItem from "../UI/UserSearchItem/UserSearchItem";
import classes from './UserSearch.module.scss';
import axios from "../../axios";
import { ISearchUser } from "../../interfaces/ISearchUser";

function UserSearch() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchUser[]>([]);

  useEffect(() => { 
    const searchUsers = setTimeout(() => { 
      axios.post("/users", { searchString: value }).then(response => setSearchResults(response.data));
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
        {searchResults.map((obj, index) => <UserSearchItem user={obj} key={index} />)}
      </ul>
    </div>
  );
};

export default UserSearch;