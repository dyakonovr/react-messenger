import type { IDialog } from "@/src/types/features/dialog";
import classes from "./styles.module.css";
import { parseDateString } from "@/src/utils/parseDateString";
import { useIsMyMessage } from "@/src/hooks/features/useIsMyMessage";
import { useTranslations } from "next-intl";

function getNewMessagesCounterText(lastMessageIsMy: boolean, newMessagesCount: number) {
  if (lastMessageIsMy || newMessagesCount <= 0) return null;
  return newMessagesCount < 10 ? newMessagesCount : "9+";
}

export const useChatItem = (dialog: IDialog, isSelected: boolean) => {
  const t = useTranslations("screens.Chats.Sidebar");
  const isMy = useIsMyMessage(dialog.lastMessage?.senderId);

  const dialogItemClasses = !isSelected
    ? classes.dialog_wrapper
    : `${classes.dialog_wrapper} ${classes.dialog_wrapper_selected}`;

  if (dialog.lastMessage === null) {
    return {
      messageText: "",
      newMessagesCounterText: "",
      myMessageIsUnread: false,
      dialogItemClasses,
      date: null
    };
  }

  const messageText = isMy
    ? `${t("your_message_prefix")} ${dialog.lastMessage.text}`
    : dialog.lastMessage.text;

  const newMessagesCounterText = getNewMessagesCounterText(isMy, dialog.newMessagesCount);
  const myMessageIsUnread = isMy && !dialog.lastMessage.isRead;

  const date = parseDateString(dialog.lastMessage.createdAt);

  return {
    messageText,
    newMessagesCounterText,
    myMessageIsUnread,
    dialogItemClasses,
    date
  };
};
