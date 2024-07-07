import { Typography } from "@/src/components/ui";
import type { IMessageWithoutId } from "@/src/types/features/chatMessages";
import { useMessageContent } from "./hooks/useMessageContent";
import { useInViewUnreadMessage } from "./hooks/useInViewUnreadMessage";
import { useIsMyMessage } from "@/src/hooks/features/useIsMyMessage";

interface IProps {
  message: IMessageWithoutId;
  id: string;
}

function ChatMessage({ message, id }: IProps) {
  const isMy = useIsMyMessage(message.senderId);
  const { messageDate, messageStyles } = useMessageContent(message, isMy);
  const ref = useInViewUnreadMessage(id, isMy, message.isRead);

  return (
    <div className={`flex ${isMy && "justify-end self-end"}`} ref={ref}>
      <Typography
        tag="p"
        variant="regular"
        className={`flex max-w-[85%] items-center justify-center rounded-2xl px-5 py-3 ${messageStyles}`}
      >
        {!message.isRead && "(Unread)"} {message.text}
      </Typography>
      <Typography
        variant="small"
        tag="span"
        className="-mb-1 ms-2 block self-end text-xs text-[#888]"
      >
        {messageDate}
      </Typography>
    </div>
  );
}

export default ChatMessage;
