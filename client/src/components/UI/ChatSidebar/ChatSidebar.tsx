import { useState } from "react";
import ChatDialogList from "../ChatDialogList/ChatDialogList";
import ChatSearchInput from "../ChatSearchInput/ChatSearchInput";
import classes from './ChatSidebar.module.scss';
import { useFriendsStore } from "../../../store/friendsStore";

function ChatSidebar() {
  const [searchValue, setSearchValue] = useState("");
  const friends = useFriendsStore(state => state.friends);

  return (
    <div className={classes.chat_sidebar}>
      <div className={classes.chat_sidebar_header}>
        <h3 className="title">Chats</h3>
      </div>
      <ChatSearchInput placeholder="Search" setSearchValue={(value: string) => setSearchValue(value)} />
      <ChatDialogList friends={friends.filter(friend => friend.login.includes(searchValue) || friend.email.includes(searchValue))} />
    </div>
  );
};

export default ChatSidebar;