import classes from './SearchChatInput.module.css'
import searchIconSvg from "../../../assets/img/icon-search.svg";

interface ISearchChatInputProps {
  placeholder: string
}

function SearchChatInput({placeholder = "Search"}: ISearchChatInputProps) {
  return (
    <div className={classes.input_wrapper}>
      <img src={searchIconSvg} alt="" className={classes.input_icon} />
      <input className={[classes.search_chat_input, "input"].join(' ')} placeholder={placeholder} />
    </div>
  );
};

export default SearchChatInput;