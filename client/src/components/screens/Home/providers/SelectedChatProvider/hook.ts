"use client";

import type { Nullable } from "@/src/types/general/nullable";
import { parseAsString, useQueryState } from "nuqs";
import { URL_ATTRIBUTE_CHAT_ID } from "../../constants";

export const useSelectedChatProvider = () => {
  const [chatId, setChatId] = useQueryState(
    URL_ATTRIBUTE_CHAT_ID,
    parseAsString.withDefault("")
  );

  // Functions
  function selectChat(chatId: Nullable<string>) {
    setChatId(chatId);
  }
  // Functions END

  return { selectedChatId: chatId, selectChat };
};
