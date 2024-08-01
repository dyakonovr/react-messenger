"use client";

import type { Nullable } from "@/src/types/general/nullable";
import { parseAsString, useQueryState } from "nuqs";

export const useSelectedChatProvider = () => {
  const [chatId, setChatId] = useQueryState("chatId", parseAsString.withDefault(""));

  // Functions
  function selectChat(chatId: Nullable<string>) {
    setChatId(chatId);
  }
  // Functions END

  return { selectedChatId: chatId, selectChat };
};
