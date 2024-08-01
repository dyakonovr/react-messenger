"use client";

import DialogMessagesService from "@/src/services/dialogMessages";
import { useChatsStore } from "@/src/stores/useChatsStore";
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
  const [isAdditionalMessagesFetching, setIsAdditionalMessagesFetching] = useState(false);
  const [chatInfo, setChatInfo] = useState<IDialogInfo | null>(null);

  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);

  useEffect(() => {
    if (dialogs === null || selectedChatId === null || !(selectedChatId in dialogs)) {
      return;
    }
    setChatInfo(dialogs[selectedChatId].info);
  }, [selectedChatId, dialogs]);

  useEffect(() => {
    if (!selectedChatId) return;
    if (chats && selectedChatId in chats) return;

    getChatMessages(1, selectedChatId);
  }, [selectedChatId]);

  // Functions
  const getChatMessages = useCallback(
    async (page: number, selectedChatId: string) => {
      if (page > totalPagesRef.current) return;

      setIsAdditionalMessagesFetching(page !== 1);
      setIsFetching(true);

      try {
        const response = await DialogMessagesService.getAll({
          chatId: selectedChatId,
          limit: 20,
          page
        });

        pageRef.current = response.data.currentPage;
        totalPagesRef.current = response.data.totalPages;

        addNewChat(selectedChatId, response.data.items);
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
    if (!selectedChatId) return;
    getChatMessages(pageRef.current + 1, selectedChatId);
  }
  // Functions END

  return {
    chatMessages: chats && selectedChatId ? chats[selectedChatId] : null,
    chatInfo,
    isFetching,
    isAdditionalMessagesFetching,
    triggerFetchData
  };
};
