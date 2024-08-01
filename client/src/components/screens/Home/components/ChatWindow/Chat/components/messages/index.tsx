import type { IChatMessages } from "@/src/types/features/chatMessages";
import { UnreadMessagesProvider } from "./providers/UnreadMessagesProvider";
import classes from "./styles.module.css";
import { ChatMessagesList } from "./components";
import { LoaderSpin } from "@/src/components/ui";
import { useChatMessages } from "./useChatMessages";

interface IProps {
  messages: IChatMessages | null;
  isChatFetching: boolean;
  isAdditionalMessagesFetching: boolean;
  triggerFetchData: () => void;
}

export function ChatMessages({
  messages,
  isChatFetching,
  isAdditionalMessagesFetching,
  triggerFetchData
}: IProps) {
  const { listRef, isLoaderSpin, setIsMessagesLoading } = useChatMessages(
    messages,
    isChatFetching,
    isAdditionalMessagesFetching,
    triggerFetchData
  );

  return (
    <UnreadMessagesProvider>
      <div className={classes.messages_wrapper} ref={listRef}>
        {isLoaderSpin && (
          <LoaderSpin
            size="m"
            rootClassName="flex items-center justify-center w-full h-full"
          />
        )}

        {messages && (
          <ChatMessagesList messages={messages} setIsLoading={setIsMessagesLoading} />
        )}
      </div>
    </UnreadMessagesProvider>
  );
}
