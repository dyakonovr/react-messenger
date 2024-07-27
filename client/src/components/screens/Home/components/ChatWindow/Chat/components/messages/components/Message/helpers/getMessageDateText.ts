import { parseDateString } from "@/src/utils/parseDateString";

export function getMessageDateText(createdAt: string, updatedAt: string) {
  const messageCreatedAt = parseDateString(createdAt);
  const messageUpdatedAt = parseDateString(updatedAt);

  if (updatedAt <= createdAt) {
    return `${messageCreatedAt.hours}:${messageCreatedAt.minutes}`;
  }

  return `upd: ${messageUpdatedAt.hours}:${messageUpdatedAt.minutes}`;
}
