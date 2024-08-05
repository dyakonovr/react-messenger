"use client";

import { type KeyboardEvent } from "react";
import { useQueryState } from "nuqs";
import { URL_ATTRIBUTE_CHAT_SEARCH_TERM } from "../../constants";

export const useDialogsData = () => {
  const [, setChatSearchTerm] = useQueryState(URL_ATTRIBUTE_CHAT_SEARCH_TERM);

  // Functions
  function updateChatSearchTerm(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newChatSearchTerm = (event.target as HTMLInputElement).value;
      setChatSearchTerm(newChatSearchTerm);
    }
  }
  // Functions END

  return updateChatSearchTerm;
};
