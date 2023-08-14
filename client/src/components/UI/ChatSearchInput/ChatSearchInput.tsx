import classes from './ChatSearchInput.module.css'
import searchIconSvg from "../../../assets/img/icon-search.svg";

interface IChatSearchInputProps {
  placeholder: string
}

function ChatSearchInput({placeholder = "Search"}: IChatSearchInputProps) {
  return (
    <div className={classes.input_wrapper}>
      <img src={searchIconSvg} alt="" className={classes.input_icon} />
      <input className={[classes.search_chat_input, "input"].join(' ')} placeholder={placeholder} />
    </div>
  );
};

export default ChatSearchInput;