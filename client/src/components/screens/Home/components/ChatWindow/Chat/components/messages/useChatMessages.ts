import { useSelectedChatContext } from "@/src/components/screens/Home/providers/SelectedChatProvider";
import { useScrollPagination } from "@/src/hooks/general/useScrollPagination";
import type { IChatMessages } from "@/src/types/features/chatMessages";
import type { Nullable } from "@/src/types/general/nullable";
import { useEffect, useLayoutEffect, useState } from "react";

export const useChatMessages = (
  messages: Nullable<IChatMessages>,
  isChatFetching: boolean,
  isAdditionalMessagesFetching: boolean,
  triggerFetchData: () => void
) => {
  const { selectedChatId } = useSelectedChatContext();
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const listRef = useScrollPagination<HTMLDivElement>(triggerFetchData, "top");
  const isLoaderSpin = isMessagesLoading && !isAdditionalMessagesFetching;

  useEffect(() => {
    // Scroll on change chat
    if (listRef.current && !isMessagesLoading && !isAdditionalMessagesFetching) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
    }
  }, [isMessagesLoading, selectedChatId, listRef]);

  useLayoutEffect(() => {
    // Scroll on send message
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
    }
  }, [messages]);

  useEffect(() => {
    setIsMessagesLoading(isChatFetching);
  }, [isChatFetching]);

  return { listRef, isLoaderSpin, setIsMessagesLoading };
};
