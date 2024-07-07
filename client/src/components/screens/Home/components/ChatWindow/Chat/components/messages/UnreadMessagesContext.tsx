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

const ReadMessagesContext = createContext<
  undefined | { markMessageAsRead: (messageId: string) => void }
>(undefined);

export const UnreadMessagesProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useSocketContext();
  const [unreadMessageIds, setUnreadMessageIds] = useState<string[]>([]);

  const debouncedReadMessages = useCallback(
    debounce((messageIds: string[]) => {
      if (messageIds.length > 0 && socket) {
        MessageSocket.readMessages(socket, messageIds);
        // console.log("@read messages:", messageIds);
      }
    }, 500),
    [socket]
  );

  useEffect(() => {
    if (unreadMessageIds.length > 0) {
      debouncedReadMessages(unreadMessageIds);
      setUnreadMessageIds([]);
    }
  }, [unreadMessageIds, debouncedReadMessages]);

  const markMessageAsRead = (messageId: string) => {
    setUnreadMessageIds((prev) => [...prev, messageId]);
  };

  return (
    <ReadMessagesContext.Provider value={{ markMessageAsRead }}>
      {children}
    </ReadMessagesContext.Provider>
  );
};

export const useReadMessages = () => {
  const context = useContext(ReadMessagesContext);
  if (context === undefined) {
    throw new Error("useReadMessages must be used within a UnreadMessagesProvider");
  }
  return context;
};
