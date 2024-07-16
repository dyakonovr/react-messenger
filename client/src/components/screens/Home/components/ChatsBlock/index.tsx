"use client";

import { Typography } from "@/src/components/ui";
import { ChatsSearchInput, ChatsList } from "./components";
import { useDialogsData } from "./useDialogsData";

export function Chats() {
  const { dialogs, selectedDialogId, selectDialog } = useDialogsData();

  return (
    <div className="custom-shadow z-[1] w-full bg-[#F8FAFF] p-[30px]">
      <Typography tag="h1" variant="title" className="mb-7">
        Chats
      </Typography>
      <ChatsSearchInput />
      <ChatsList
        dialogs={dialogs}
        selectedDialogId={selectedDialogId}
        selectDialog={selectDialog}
      />
    </div>
  );
}
