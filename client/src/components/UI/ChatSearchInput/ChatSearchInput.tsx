import classes from './ChatSearchInput.module.css'
import searchIconSvg from "../../../assets/img/icon-search.svg";

interface IChatSearchInputProps {
  placeholder: string,
  setSearchValue: (value: string) => void
}

function ChatSearchInput({placeholder = "Search", setSearchValue}: IChatSearchInputProps) {
  return (
    <div className={classes.input_wrapper}>
      <img src={searchIconSvg} alt="" className={classes.input_icon} />
      <input
        className={[classes.search_chat_input, "input"].join(' ')}
        placeholder={placeholder}
        onChange={(e) => { setSearchValue((e.target as HTMLInputElement).value) }}
      />
    </div>
  );
};

export default ChatSearchInput;