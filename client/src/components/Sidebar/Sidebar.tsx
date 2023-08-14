//@ts-ignore
import { ReactComponent as ChatsLogo } from "../../assets/img/icon-chats.svg";
//@ts-ignore
import { ReactComponent as UsersLogo } from "../../assets/img/icon-users.svg";
//@ts-ignore
import { ReactComponent as SettingsIcon } from "../../assets/img/icon-settings.svg";
import classes from './Sidebar.module.scss';
import SidebarButton from "../UI/SidebarButton/SidebarButton";
import { useScreenStore } from "../../store/screenStore";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";

function Sidebar() {
  const screen = useScreenStore(state => state.screen);
  const navigate = useNavigate();

  return (
    <div className={classes.sidebar}>
      <SidebarButton isActive={screen === "chat"} screen="chat"><ChatsLogo width="25px" height="25px" /></SidebarButton>
      <SidebarButton isActive={screen === "user-search"} screen="user-search"><UsersLogo width="25px" height="25px" /></SidebarButton>
      <SidebarButton isActive={screen === "settings"} screen="settings"><SettingsIcon width="25px" height="25px" /></SidebarButton>
      <button onClick={() => { 
        localStorage.removeItem("token");
        navigate(Paths.REGISTER);
       }}>logout</button>
      <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className={["avatar", classes.sidebar_avatar].join(' ')} />
    </div>
  );
};

export default Sidebar;