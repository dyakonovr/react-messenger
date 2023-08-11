import { useRef } from "react";
import classes from './ChatInput.module.scss';

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Функции
  function handleClick() {
    const input = inputRef.current as HTMLInputElement;
    const inputValue = input.value;

    console.log(`message: ${inputValue}`);

    // ...

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