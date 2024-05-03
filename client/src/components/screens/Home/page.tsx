import { ChatWindow, Chats } from "./components";
import classes from "./styles.module.css";

function HomePage() {
  return (
    <main className={classes.index_page}>
      <Chats />
      <ChatWindow />
    </main>
  );
}

export default HomePage;
