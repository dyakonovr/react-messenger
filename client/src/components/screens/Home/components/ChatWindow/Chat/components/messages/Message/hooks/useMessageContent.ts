import type { IMessageWithoutId } from "@/src/types/features/chatMessages";
import { parseDateString } from "@/src/utils/parseDateString";

function getMessageDateText(createdAt: string, updatedAt: string) {
  const messageCreatedAt = parseDateString(createdAt);
  const messageUpdatedAt = parseDateString(updatedAt);

  return `${messageCreatedAt.day}.${messageCreatedAt.month}.${messageCreatedAt.year}, ${messageCreatedAt.hours}:${messageCreatedAt.minutes}`;

  // if (updatedAt <= createdAt) {
  //   return `${messageCreatedAt.day}.${messageCreatedAt.month}.${messageCreatedAt.year}, ${messageCreatedAt.hours}:${messageCreatedAt.minutes}`;
  // }
  // return `upd: ${messageUpdatedAt.hours}:${messageUpdatedAt.minutes}`;
}

export const useMessageContent = (message: IMessageWithoutId, isMy: boolean) => {
  return {
    messageStyles: !isMy
      ? "bg-white text-[#696969]"
      : "bg-[var(--main-color)] text-white",
    messageDate: getMessageDateText(message.createdAt, message.updatedAt)
  };
};
