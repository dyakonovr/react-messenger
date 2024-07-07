import { Avatar, Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import type { IDialog } from "@/src/types/features/dialog";
import { parseDateString } from "@/src/utils/parseDateString";
import type { Nullable } from "@/src/types/general/nullable";
import { useIsMyMessage } from "@/src/hooks/features/useIsMyMessage";

interface IProps {
  userId: string;
  dialog: IDialog;
  isSelected: boolean;
  selectDialog: (dialogId: Nullable<string>) => void;
}

function getNewMessagesCounterText(lastMessageIsMy: boolean, newMessagesCount: number) {
  if (lastMessageIsMy || newMessagesCount <= 0) return null;
  return newMessagesCount < 10 ? newMessagesCount : "9+";
}

function ChatItem({ dialog, userId, isSelected, selectDialog }: IProps) {
  const isMy = useIsMyMessage(dialog.lastMessage.senderId);

  const messageText = isMy ? `You: ${dialog.lastMessage.text}` : dialog.lastMessage.text;
  const newMessagesCounterText = getNewMessagesCounterText(isMy, dialog.newMessagesCount);
  const myMessageIsUnread = isMy && !dialog.lastMessage.isRead;
  const dialogItemClasses = !isSelected
    ? classes.dialog_wrapper
    : `${classes.dialog_wrapper} ${classes.dialog_wrapper_selected}`;
  const date = parseDateString(dialog.lastMessage.createdAt);

  return (
    <div className={dialogItemClasses} onClick={() => selectDialog(userId)}>
      <Avatar
        alt={dialog.user.nickname}
        nickname={dialog.user.nickname}
        src={dialog.user.avatar}
        className="mt-auto"
      />
      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {dialog.user.nickname}
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
        <Typography variant="small" tag="span" className="text-xs text-[#686768]">
          {date.hours}:{date.minutes}
        </Typography>

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
