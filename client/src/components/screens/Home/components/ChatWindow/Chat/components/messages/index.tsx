import ChatMessage from "./Message";
import classes from "./styles.module.css";

export function ChatMessages() {
  return (
    <div className={classes.messages_wrapper}>
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </div>
  );
}
