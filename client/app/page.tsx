import { ChatWindow, Chats } from "@/src/components/screens/Home/index";
import classes from "./styles.module.css";

export default function Home() {
  return (
    <main className={classes.index_page}>
      <Chats />
      <ChatWindow />
    </main>
  );
}
