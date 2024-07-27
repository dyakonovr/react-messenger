import type { IChatMessages } from "@/src/types/features/chatMessages";
import { Typography } from "@/src/components/ui";
import { UnreadMessagesProvider } from "./UnreadMessagesContext";
import classes from "./styles.module.css";
import { ChatMessagesList } from "./components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollPagination } from "@/src/hooks/general/useScrollPagination";
import { useSelectedChatContext } from "@/src/components/screens/Home/providers/SelectedChatProvider";

interface IProps {
  messages: IChatMessages | null;
  isChatLoading: boolean;
  triggerFetchData: () => void;
}

export function ChatMessages({ messages, isChatLoading, triggerFetchData }: IProps) {
  const { selectedChatId } = useSelectedChatContext();
  // const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const listRef = useScrollPagination<HTMLDivElement>(triggerFetchData, "top");

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
    }
  }, [selectedChatId]);

  // useEffect(() => {
  //   setIsMessagesLoading(true);
  // }, [messages]);

  return (
    <UnreadMessagesProvider>
      <div className={classes.messages_wrapper} ref={listRef}>
        {/* {isMessagesLoading && <Typography variant="subtitle">Loading...</Typography>} */}
        {messages && <ChatMessagesList messages={messages} setIsLoading={() => {}} />}
      </div>
    </UnreadMessagesProvider>
  );
}
