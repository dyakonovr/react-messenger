"use client";

import { ChatWindow, Chats } from "./components";
import classes from "./styles.module.css";
import { useMessageSocketHandlers } from "./useMessageSocketHandlers";

function HomePage() {
  useMessageSocketHandlers();

  return (
    <main className={classes.index_page}>
      <Chats />
      <ChatWindow />
    </main>
  );
}

export default HomePage;
