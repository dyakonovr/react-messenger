"use client";

import DialogMessagesService from "@/src/services/dialogMessages";
import { useChatsStore } from "@/src/stores/useChatsStore";
import type { IChatMessages } from "@/src/types/features/chatMessages";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelectedChatContext } from "../../../../providers/SelectedChatProvider";
import { useDialogsDataContext } from "../../../../providers/DialogsDataProvider";
import type { IDialogInfo } from "@/src/types/features/dialog";

export const useChatData = () => {
  const { selectedChatId } = useSelectedChatContext();
  const { dialogs } = useDialogsDataContext();

  const chats = useChatsStore((state) => state.chats);
  const addNewChat = useChatsStore((state) => state.addNewChat);

  const [isFetching, setIsFetching] = useState(false);
  const [chatInfo, setChatInfo] = useState<IDialogInfo | null>(null);
  // const [chatMessages, setChatMessages] = useState<IChatMessages | null>(null);

  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);

  useEffect(() => {
    if (dialogs === null || selectedChatId === null || !(selectedChatId in dialogs)) {
      return;
    }
    setChatInfo(dialogs[selectedChatId].info);
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;
    // if (!chats || !(selectedChatId in chats)) {
    //   return;
    // }

    if (chats && selectedChatId in chats) return;
    getChatMessages(1, selectedChatId);

    // setChatMessages(chats[selectedChatId]);
  }, [selectedChatId]);

  // Functions
  const getChatMessages = useCallback(
    async (page: number, selectedChatId: string) => {
      if (page > totalPagesRef.current) return;

      try {
        const response = await DialogMessagesService.getAll({
          chatId: selectedChatId,
          limit: 10,
          page
        });

        pageRef.current = response.data.currentPage;
        totalPagesRef.current = response.data.totalPages;

        addNewChat(selectedChatId, response.data.items);
        // setChatMessages(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    },
    [selectedChatId, addNewChat]
  );

  function triggerFetchData() {
    if (!selectedChatId) return;
    console.log("@trigger");
    getChatMessages(pageRef.current + 1, selectedChatId);
  }
  // Functions END

  return {
    chatMessages: chats && selectedChatId ? chats[selectedChatId] : null,
    chatInfo,
    isLoading: isFetching,
    triggerFetchData
  };
};
