"use client";

import { UrlParamsProvider } from "@/src/providers/UrlParamProvider/provider";
import { ChatWindow, Chats } from "./components";
import { SelectedChatProvider } from "./providers/SelectedChatProvider";
import classes from "./styles.module.css";
import { useMessageSocketHandlers } from "./hooks/useMessageSocketHandlers";
import { DialogsDataProvider } from "./providers/DialogsDataProvider";

function HomePage() {
  useMessageSocketHandlers();

  return (
    <main className={classes.index_page}>
      <UrlParamsProvider>
        <DialogsDataProvider>
          <SelectedChatProvider>
            <Chats />
            <ChatWindow />
          </SelectedChatProvider>
        </DialogsDataProvider>
      </UrlParamsProvider>
    </main>
  );
}

export default HomePage;
