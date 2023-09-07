import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserSearch from "../../components/UserSearch/UserSearch";
import { useHomeScreensStore } from "../../store/screenStore";
import classes from "./HomePage.module.css";

function HomePage() {
  const screen = useHomeScreensStore(state => state.screen);

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