import { useRef } from "react";
import classes from './ChatInput.module.scss';
import axios from "../../../axios";
import { createToast } from "../../../utils/createToast";
import { useChatsStore } from "../../../store/chatsStore";
import { ServerPaths } from "../../../enums/ServerPaths";

interface IChatInputProps {
  recipientUserId: string
}

function ChatInput({recipientUserId}: IChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const addMessageInChat = useChatsStore(state => state.addMessageInChat);

  // Функции
  async function handleClick() {
    const input = inputRef.current as HTMLInputElement;
    const inputValue = input.value;

    console.log(`message: ${inputValue}`);

    await axios.post(ServerPaths.MESSAGES.CREATE, { recipient: recipientUserId, text: inputValue })
      .then(response => addMessageInChat(recipientUserId, response.data.message))
      .catch(error => createToast(error.response.data.message))

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