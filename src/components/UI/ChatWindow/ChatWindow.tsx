import Message from "../Message/Message";
import classes from './ChatWindow.module.scss'

function ChatWindow() {
  return (
    <div className={classes.chat_window}>
      <Message isMyMessage={true} />
      <Message isMyMessage={false} />
    </div>
  );
};

export default ChatWindow;