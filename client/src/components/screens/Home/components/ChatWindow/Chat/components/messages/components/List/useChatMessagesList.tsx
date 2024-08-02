import type { IChatMessages } from "@/src/types/features/chatMessages";
import type { Nullable } from "@/src/types/general/nullable";
import { parseDateString } from "@/src/utils/parseDateString";
import { ChatMessagesDate } from "../Date";
import { ChatMessage } from "../Message";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

function formatRelativeDate(
  dateString: string,
  todayWord: string,
  yesterdayWord: string
): string {
  const parsedDate = parseDateString(dateString);
  const date = new Date(parsedDate.timestamp);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isThisYear = date.getFullYear() === today.getFullYear();

  if (isToday) return todayWord;
  else if (isYesterday) return yesterdayWord;
  else if (isThisYear) return `${parsedDate.day}.${parsedDate.month}`;
  else return `${parsedDate.day}.${parsedDate.month}.${parsedDate.year}`;
}

export const useChatMessagesList = (messages: IChatMessages) => {
  const t = useTranslations("common");
  const isChatEmpty = Object.keys(messages).length === 0;

  // Functions
  const getSortedMessages = useCallback(() => {
    if (isChatEmpty) return [];
    const blocks = [];

    let date: Nullable<string> = null;

    for (let index = 0; index < Object.keys(messages).length; index++) {
      const messageId = Object.keys(messages)[index];
      const message = messages[messageId];
      const messageDate = formatRelativeDate(
        message.createdAt,
        t("days.today"),
        t("days.yesterday")
      );

      if (date !== messageDate) {
        blocks.push(<ChatMessagesDate date={messageDate} key={message.createdAt} />);
        date = messageDate;
      }

      blocks.push(<ChatMessage id={messageId} key={messageId} message={message} />);
    }

    return blocks;
  }, [messages, isChatEmpty]);
  // Functions END

  return {
    isChatEmpty,
    chatMessageBlock: getSortedMessages()
  };
};
