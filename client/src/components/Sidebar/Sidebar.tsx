//@ts-ignore
import { ReactComponent as ChatsLogo } from "../../assets/img/icon-chats.svg";
//@ts-ignore
import { ReactComponent as UsersLogo } from "../../assets/img/icon-users.svg";
//@ts-ignore
import { ReactComponent as SettingsIcon } from "../../assets/img/icon-settings.svg";
//@ts-ignore
import { ReactComponent as LogoutIcon } from "../../assets/img/icon-logout.svg";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useAuthStore } from "../../store/authStore";
import { useHomeScreensStore } from "../../store/screenStore";
import SidebarButton from "../UI/SidebarButton/SidebarButton";
import classes from './Sidebar.module.scss';

function Sidebar() {
  const screen = useHomeScreensStore(state => state.screen);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  // Функции
  function handleLogoutButton() {
    localStorage.removeItem("token");
    navigate(Paths.REGISTER);
  }
  // Функции END

  return (
    <div className={classes.sidebar}>
      <SidebarButton isActive={screen === "chat"} screen="chat"><ChatsLogo width="25px" height="25px" /></SidebarButton>
      <SidebarButton isActive={screen === "user-search"} screen="user-search"><UsersLogo width="25px" height="25px" /></SidebarButton>
      <SidebarButton isActive={screen === "settings"} screen="settings"><SettingsIcon width="25px" height="25px" /></SidebarButton>
      <button className="sidebar_button" onClick={handleLogoutButton}><LogoutIcon width="25px" height="25px" /></button>
      <div className={["avatar-placeholder", classes.sidebar_avatar].join(' ')}>{login && login[0]}</div>
      {/* <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className={["avatar", classes.sidebar_avatar].join(' ')} /> */}
    </div>
  );
};

export default Sidebar;