"use client";

import DialogMessagesService from "@/src/services/dialogMessages";
import { useChatsStore } from "@/src/stores/useChatsStore";
import { useCallback, useEffect, useState } from "react";
import { useSelectedChatContext } from "../../../../providers/SelectedChatProvider";
import { useDialogsDataContext } from "../../../../providers/DialogsDataProvider";
import type { IDialogInfo } from "@/src/types/features/dialog";

export const useChatData = () => {
  const { selectedChatId } = useSelectedChatContext();
  const { dialogs } = useDialogsDataContext();

  const chats = useChatsStore((state) => state.chats);
  const addNewChat = useChatsStore((state) => state.addNewChat);

  const [isFetching, setIsFetching] = useState(false);
  const [isAdditionalMessagesFetching, setIsAdditionalMessagesFetching] = useState(false);
  const [chatInfo, setChatInfo] = useState<IDialogInfo | null>(null);

  useEffect(() => {
    if (dialogs === null || selectedChatId === null || !(selectedChatId in dialogs)) {
      return;
    }
    setChatInfo(dialogs[selectedChatId].info);
  }, [selectedChatId, dialogs]);

  useEffect(() => {
    if (!selectedChatId) return;
    if (chats && selectedChatId in chats) return;

    getChatMessages(selectedChatId, 1, 1);
  }, [selectedChatId]);

  // Functions
  const getChatMessages = useCallback(
    async (selectedChatId: string, page: number, totalPages: number) => {
      if (page > totalPages) return;

      setIsAdditionalMessagesFetching(page !== 1);
      setIsFetching(true);

      try {
        const response = await DialogMessagesService.getAll({
          chatId: selectedChatId,
          limit: 20,
          page
        });

        addNewChat(
          selectedChatId,
          response.data.items,
          response.data.currentPage,
          response.data.totalPages
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
        setIsAdditionalMessagesFetching(false);
      }
    },
    [selectedChatId, addNewChat]
  );

  function triggerFetchData() {
    if (!selectedChatId || !chats || !(selectedChatId in chats)) return;
    getChatMessages(
      selectedChatId,
      chats[selectedChatId].page + 1,
      chats[selectedChatId].totalPages
    );
  }
  // Functions END

  const chatMessagesExists = chats && selectedChatId && selectedChatId in chats;
  return {
    chatMessages: chatMessagesExists ? chats[selectedChatId].messages : null,
    chatInfo,
    isFetching,
    isAdditionalMessagesFetching,
    triggerFetchData
  };
};
