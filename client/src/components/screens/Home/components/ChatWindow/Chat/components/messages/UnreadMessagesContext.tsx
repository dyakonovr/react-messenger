import type { ReactNode } from "react";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { useSocketContext } from "@/src/components/layout/SocketProvider";
import MessageSocket from "@/src/sockets/message";
import { debounce } from "@/src/hooks/general/useDebounceCallback/debounce";
import { useSelectedChatContext } from "@/src/components/screens/Home/providers/SelectedChatProvider";
import { transformStringToNumber } from "@/src/utils/transformStringToNumber";

const ReadMessagesContext = createContext<
  undefined | { markMessageAsRead: (messageId: string) => void }
>(undefined);

interface IProps {
  children: ReactNode;
}

export const UnreadMessagesProvider = ({ children }: IProps) => {
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

  return (
    <ReadMessagesContext.Provider value={{ markMessageAsRead }}>
      {children}
    </ReadMessagesContext.Provider>
  );
};

export const useUnreadMessagesContext = () => {
  const context = useContext(ReadMessagesContext);
  if (context === undefined) {
    throw new Error("useReadMessages must be used within a UnreadMessagesProvider");
  }
  return context;
};
