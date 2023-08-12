import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={classes.app}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default HomePage;