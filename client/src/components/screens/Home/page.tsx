"use client";

import { ChatWindow, Chats } from "./components";
import { ScreenLayoutWithSidebar } from "../../ui";
import { ScreenLayoutWithSidebarSidebar } from "../../ui/ScreenLayoutWithSidebar/Sidebar";
import { ScreenLayoutWithSidebarMainWindow } from "../../ui/ScreenLayoutWithSidebar/MainWindow";
import { useSelectedChatContext } from "./providers/SelectedChatProvider";
import { useMessageSocketHandlers } from "./hooks/useMessageSocketHandlers";

function HomePage() {
  const { selectedChatId } = useSelectedChatContext();
  useMessageSocketHandlers();

  return (
    <main className="h-full">
      <ScreenLayoutWithSidebar isSidebarShowedByDefault={!selectedChatId}>
        <ScreenLayoutWithSidebarSidebar>
          <Chats />
        </ScreenLayoutWithSidebarSidebar>
        <ScreenLayoutWithSidebarMainWindow>
          <ChatWindow />
        </ScreenLayoutWithSidebarMainWindow>
      </ScreenLayoutWithSidebar>
    </main>
  );
}

export default HomePage;
