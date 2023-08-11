import DialogList from "../UI/DialogList/DialogList";
import SearchChatInput from "../UI/SearchChatInput/SearchChatInput";
import classes from './Sidebar.module.scss';

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar_header}>
        <h3 className={classes.sidebar_title}>Chat</h3>
        <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className={["avatar", classes.sidebar_avatar].join(' ')} />
      </div>
      <SearchChatInput placeholder="Search" />
      <DialogList />
    </div>
  );
};

export default Sidebar;