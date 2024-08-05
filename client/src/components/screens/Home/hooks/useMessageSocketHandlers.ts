"use client";

import { useEffect } from "react";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import type { IDialogsRecord } from "@/src/types/features/dialog";
import { useChatsStore } from "@/src/stores/useChatsStore";
import MessageSocket from "@/src/sockets/message";
import { useUserStore } from "@/src/stores/useUserStore";
import { useSocketContext } from "@/src/components/layout/providers/SocketProvider";

export interface IReadMessageResponse {
  status: "success";
  messageIds: number[];
  chatId: number;
}

export const useMessageSocketHandlers = () => {
  const myId = useUserStore((state) => state.user?.id);
  const { isConnected, socket } = useSocketContext();
  const setNewDialogs = useDialogsStore((state) => state.setNewDialogs);
  const setLastMessageIsRead = useDialogsStore((state) => state.setLastMessageIsRead);
  const addMessageInChat = useChatsStore((state) => state.addMessageInChat);
  const readMessageInChat = useChatsStore((state) => state.readMessageInChat);

  useEffect(() => {
    if (!isConnected || !socket) return;

    MessageSocket.onMessageCreated(socket, (data: IDialogsRecord) => {
      console.log("@message created!: ", data);
      setNewDialogs(data);

      const dialogId = Object.keys(data)[0];
      const lastMessage = data[dialogId].lastMessage;
      if (!lastMessage) return;

      const { id: messageId, ...restMessage } = lastMessage;
      addMessageInChat(dialogId, { [messageId]: restMessage });
    });

    MessageSocket.onMessageRead(socket, (data: IReadMessageResponse) => {
      console.log("@read message:", data);
      if (data.status !== "success" || !myId) return;

      data.messageIds.forEach((messageId) => {
        const chatIdAsString = String(data.chatId);
        readMessageInChat(chatIdAsString, String(messageId));
        setLastMessageIsRead(chatIdAsString, String(messageId));
      });
    });

    return () => {
      MessageSocket.offMessageCreated(socket);
      MessageSocket.offMessageRead(socket);
    };
  }, [
    addMessageInChat,
    isConnected,
    myId,
    readMessageInChat,
    setLastMessageIsRead,
    setNewDialogs,
    socket
  ]);
};
