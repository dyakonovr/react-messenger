import classes from "./styles.module.css";
import { Typography } from "@/src/components/ui";
import type { IMessageWithoutId } from "@/src/types/features/chatMessages";
import { getMessageDateText } from "./helpers/getMessageDateText";
import { useInViewUnreadMessage } from "./hooks/useInViewUnreadMessage";
import { useIsMyMessage } from "@/src/hooks/features/useIsMyMessage";

interface IProps {
  message: IMessageWithoutId;
  id: string;
}

export function ChatMessage({ message, id }: IProps) {
  const isMy = useIsMyMessage(message.senderId);
  const messageDate = getMessageDateText(message.createdAt, message.updatedAt);
  const ref = useInViewUnreadMessage(id, isMy, message.isRead);

  return (
    <div className={`${classes.message} ${isMy && classes.message_is_my}`} ref={ref}>
      <Typography tag="p" variant="regular" className={classes.message_text}>
        {!message.isRead && "(Unread)"} {message.text}
      </Typography>
      <Typography variant="small" tag="span" className={classes.message_date}>
        {messageDate}
      </Typography>
    </div>
  );
}
