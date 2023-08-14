import ChatDialogList from "../ChatDialogList/ChatDialogList";
import ChatSearchInput from "../ChatSearchInput/ChatSearchInput";
import classes from './ChatSidebar.module.scss';

function ChatSidebar() {
  return (
    <div className={classes.chat_sidebar}>
      <div className={classes.chat_sidebar_header}>
        <h3 className="title">Chats</h3>
      </div>
      <ChatSearchInput placeholder="Search" />
      <ChatDialogList />
    </div>
  );
};

export default ChatSidebar;