"use client";

import DialogMessagesService from "@/src/services/dialogMessages";
import { useChatsStore } from "@/src/stores/useChatsStore";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import type { IChatMessages } from "@/src/types/features/chatMessages";
import { useCallback, useEffect, useState } from "react";

export const useChatData = (selectedDialogId: string) => {
  const dialogs = useDialogsStore((state) => state.dialogs);
  const selectDialog = useDialogsStore((state) => state.selectDialog);

  const chats = useChatsStore((state) => state.chats);
  const addNewChat = useChatsStore((state) => state.addNewChat);
  const [chatMessages, setChatMessages] = useState<IChatMessages | null>(null);

  useEffect(() => {
    if (!chats || !(selectedDialogId in chats)) {
      getChatMessages();
      return;
    }

    setChatMessages(chats[selectedDialogId]);
  }, [selectedDialogId, chats]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscClick);
    return () => document.removeEventListener("keydown", handleEscClick);
  }, []);

  // Functions
  const getChatMessages = useCallback(async () => {
    try {
      const response = await DialogMessagesService.getAll({
        friendId: selectedDialogId,
        limit: 20,
        page: 1
      });
      addNewChat(selectedDialogId, response.data.items);
      setChatMessages(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }, [selectedDialogId, addNewChat]);

  const handleEscClick = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        selectDialog(null);
      }
    },
    [selectDialog]
  );
  // Functions END

  return {
    chatMessages,
    user: dialogs === null ? null : dialogs[selectedDialogId].user
  };
};
