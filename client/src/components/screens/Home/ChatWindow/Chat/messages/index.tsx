import Message from "./message";
import classes from "./styles.module.css";

function ChatMessages() {
  return (
    <div className={classes.messages_wrapper}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default ChatMessages;
