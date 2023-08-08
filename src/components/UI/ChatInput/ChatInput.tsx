import classes from './ChatInput.module.scss';

function ChatInput() {
  return (
    <div className={classes.chat_input_wrapper}>
      <input className={["input", classes.chat_input].join(' ')} placeholder="Write a message..." />
      <button className={classes.chat_input_send_button}></button>
    </div>
  );
};

export default ChatInput;