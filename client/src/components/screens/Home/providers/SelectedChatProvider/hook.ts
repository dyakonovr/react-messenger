"use client";

import { useUrlParamsContext } from "@/src/providers/UrlParamProvider/provider";
import type { Nullable } from "@/src/types/general/nullable";

export const useSelectedChatProvider = () => {
  const { setParams, getParamValue, deleteUrlParam } = useUrlParamsContext();
  const selectedChatId = getParamValue("chatId");

  // Functions
  function selectChat(chatId: Nullable<string>) {
    if (!chatId) return deleteUrlParam("chatId");
    setParams({ chatId });
  }
  // Functions END

  return { selectedChatId, selectChat };
};
