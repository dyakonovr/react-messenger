import { Avatar, Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import type { IDialog } from "@/src/types/features/dialog";
import type { Nullable } from "@/src/types/general/nullable";
import { useChatItem } from "./useChatItem";

interface IProps {
  userId: string;
  dialog: IDialog;
  isSelected: boolean;
  selectChat: (chatId: Nullable<string>) => void;
}

function ChatItem({ dialog, userId, isSelected, selectChat }: IProps) {
  const {
    date,
    dialogItemClasses,
    messageText,
    myMessageIsUnread,
    newMessagesCounterText
  } = useChatItem(dialog, isSelected);

  return (
    <div className={dialogItemClasses} onClick={() => selectChat(userId)}>
      <Avatar
        alt={dialog.info.name}
        nickname={dialog.info.name}
        src={dialog.info.avatar}
        className="mt-auto"
      />
      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {dialog.info.name}
        </Typography>
        <Typography
          variant="small"
          tag="p"
          className="max-w-[250px] truncate text-[#7C7C7D]"
        >
          {messageText}
        </Typography>
      </div>
      <div className="ms-auto flex flex-col">
        {date && (
          <Typography variant="small" tag="span" className="text-xs text-[#686768]">
            {date.hours}:{date.minutes}
          </Typography>
        )}

        {newMessagesCounterText && (
          <Typography variant="small" tag="span" className={classes.new_messages_counter}>
            {newMessagesCounterText}
          </Typography>
        )}

        {myMessageIsUnread && <span className={classes.unread_message}></span>}
      </div>
    </div>
  );
}

export default ChatItem;
