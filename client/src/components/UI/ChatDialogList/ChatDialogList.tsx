import ChatDialog from "../ChatDialog/ChatDialog";
import classes from './ChatDialogList.module.css'

function ChatDialogList() {
  return (
    <ul className={classes.dialog_list}>
      <ChatDialog />
      <ChatDialog />
      <ChatDialog />
    </ul>
  );
};

export default ChatDialogList;