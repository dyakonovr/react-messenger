"use client";

import { type KeyboardEvent } from "react";
import { useQueryState } from "nuqs";

export const useDialogsData = () => {
  const [, setChatSearchTerm] = useQueryState("chatSearchTerm");

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
