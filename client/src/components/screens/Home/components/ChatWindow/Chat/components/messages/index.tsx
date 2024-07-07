import type { IChatMessages } from "@/src/types/features/chatMessages";
import ChatMessage from "./Message";
import classes from "./styles.module.css";
import { Typography } from "@/src/components/ui";
import { UnreadMessagesProvider } from "./UnreadMessagesContext";

export function ChatMessages({ messages }: { messages: IChatMessages | null }) {
  if (!messages) return <Typography variant="subtitle">Loading...</Typography>;

  return (
    <UnreadMessagesProvider>
      <div className={classes.messages_wrapper}>
        {Object.keys(messages).map((messageId) => (
          <ChatMessage id={messageId} key={messageId} message={messages[messageId]} />
        ))}
      </div>
    </UnreadMessagesProvider>
  );
}
