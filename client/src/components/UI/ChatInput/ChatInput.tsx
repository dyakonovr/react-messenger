import { useRef } from "react";
import socket from "../../../socket";
import { useAuthStore } from "../../../store/authStore";
import classes from './ChatInput.module.scss';

interface IChatInputProps {
  recipientUserId: string,
}

function ChatInput({recipientUserId}: IChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sender = useAuthStore(state => state._id);

  // Функции
  async function handleClick() {
    const input = inputRef.current as HTMLInputElement;
    const inputValue = input.value;
    socket.emit("MESSAGE:SEND", { recipient: recipientUserId, text: inputValue, sender });
    input.value = '';
  }
  // Функции END

  return (
    <div className={classes.chat_input_wrapper}>
      <input
        className={["input", classes.chat_input].join(' ')}
        ref={inputRef}
        placeholder="Write a message..."
      />
      <button className={classes.chat_input_send_button} onClick={handleClick}></button>
    </div>
  );
};

export default ChatInput;