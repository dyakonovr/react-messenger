"use client";

import { useDialogsStore } from "@/src/stores/useDialogsStore";
import Chat from "./Chat";
import SelectChatWindow from "./SelectChatWindow";

export function ChatWindow() {
  const selectedDialogId = useDialogsStore((state) => state.selectedDialogId);
  return selectedDialogId ? (
    <Chat selectedDialogId={selectedDialogId} />
  ) : (
    <SelectChatWindow />
  );
}
