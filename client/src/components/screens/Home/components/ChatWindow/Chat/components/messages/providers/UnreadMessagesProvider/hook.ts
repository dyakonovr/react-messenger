import { useSelectedChatContext } from "@/src/components/screens/Home/providers/SelectedChatProvider";
import { debounce } from "@/src/hooks/general/useDebounceCallback/debounce";
import { useCallback, useEffect, useState } from "react";
import MessageSocket from "@/src/sockets/message";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";
import { useSocketContext } from "@/src/components/layout/providers/SocketProvider";

export const useUnreadMessagesProvider = () => {
  const { socket } = useSocketContext();
  const [unreadMessageIds, setUnreadMessageIds] = useState<number[]>([]);
  const { selectedChatId } = useSelectedChatContext();

  const debouncedReadMessages = useCallback(
    debounce((messageIds: number[]) => {
      if (!selectedChatId) return;
      if (messageIds.length > 0 && socket) {
        console.log("@send read messages:", { messageIds, chatId: selectedChatId });
        MessageSocket.readMessages(socket, {
          messageIds,
          chatId: transformStringToNumber(selectedChatId)
        });
        setUnreadMessageIds([]);
      }
    }, 500),
    [socket]
  );

  useEffect(() => {
    if (unreadMessageIds.length > 0) {
      debouncedReadMessages(unreadMessageIds);
    }
  }, [unreadMessageIds, debouncedReadMessages]);

  const markMessageAsRead = (messageId: string) => {
    if (isNaN(+messageId)) return;
    setUnreadMessageIds((prev) => [...prev, +messageId]);
  };

  return markMessageAsRead;
};
