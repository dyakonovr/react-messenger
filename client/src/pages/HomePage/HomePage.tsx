import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useScreenStore } from "../../store/screenStore";
import classes from "./HomePage.module.css";
import UserSearch from "../../components/UserSearch/UserSearch";

function HomePage() {
  const screen = useScreenStore(state => state.screen);

  return (
    <div className={classes.app}>
      <Sidebar />
      {screen === "chat" && <Chat />}
      {screen === "user-search" && <UserSearch />}
      {screen === "settings" && <div>settings</div>}
    </div>
  );
};

export default HomePage;