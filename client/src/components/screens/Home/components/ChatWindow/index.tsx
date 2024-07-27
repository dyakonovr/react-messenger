"use client";

import Chat from "./Chat";
import SelectChatWindow from "./SelectChatWindow";
import { useSelectedChatContext } from "../../providers/SelectedChatProvider";

export function ChatWindow() {
  const { selectedChatId } = useSelectedChatContext();
  return selectedChatId ? <Chat /> : <SelectChatWindow />;
}
