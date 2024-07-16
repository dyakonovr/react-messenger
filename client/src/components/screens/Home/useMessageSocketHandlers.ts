"use client";

import { useEffect } from "react";
import { useSocketContext } from "../../layout/SocketProvider";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import type { IDialogsRecord } from "@/src/types/features/dialog";
import { useChatsStore } from "@/src/stores/useChatsStore";
import MessageSocket from "@/src/sockets/message";
import { useUserStore } from "@/src/stores/useUserStore";
import type { IMessageWithoutId } from "@/src/types/features/chatMessages";

type IReadMessageResponseItem = Pick<IMessageWithoutId, "senderId"> & {
  id: number;
};

export interface IReadMessageResponse {
  status: "success";
  messages: {
    data: IReadMessageResponseItem[];
    recipientId: number;
    senderId: number;
  };
}

export const useMessageSocketHandlers = () => {
  const myId = useUserStore((state) => state.user?.id);
  const { isConnected, socket } = useSocketContext();
  const selectedDialogId = useDialogsStore((state) => state.selectedDialogId);
  const setNewDialogs = useDialogsStore((state) => state.setNewDialogs);
  const setLastMessageIsRead = useDialogsStore((state) => state.setLastMessageIsRead);
  const addMessageInChat = useChatsStore((state) => state.addMessageInChat);
  const readMessageInChat = useChatsStore((state) => state.readMessageInChat);

  // useEffect(() => {
  //   if (!isConnected || !socket) return;

  //   MessageSocket.onMessageCreated(socket, (data: IDialogsRecord) => {
  //     console.log("@message created!: ", data);
  //     setNewDialogs(data);

  //     const dialogId = Object.keys(data)[0];
  //     const { id: messageId, ...restMessage } = data[dialogId].lastMessage;
  //     addMessageInChat(dialogId, { [messageId]: restMessage });
  //   });

  //   MessageSocket.onMessageRead(socket, (data: IReadMessageResponse) => {
  //     console.log("@read message:", data);
  //     if (data.status !== "success" || !myId) return;

  //     const dialogId =
  //       myId === data.messages.senderId
  //         ? String(data.messages.recipientId)
  //         : String(data.messages.senderId);

  //     data.messages.data.forEach((message) => {
  //       readMessageInChat(dialogId, String(message.id));
  //       setLastMessageIsRead(dialogId, String(message.id));
  //     });
  //   });

  //   return () => {
  //     MessageSocket.offMessageCreated(socket);
  //     MessageSocket.offMessageRead(socket);
  //   };
  // }, [isConnected, socket, selectedDialogId]);
};
