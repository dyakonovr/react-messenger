"use client";

import type { KeyboardEvent } from "react";
import { useSelectedChatContext } from "../../providers/SelectedChatProvider";
import { useUrlParamsContext } from "@/src/providers/UrlParamProvider/provider";
import { useDialogsDataContext } from "../../providers/DialogsDataProvider";

export const useDialogsData = () => {
  const { selectedChatId, selectChat } = useSelectedChatContext();
  const { dialogs, triggerFetchData } = useDialogsDataContext();
  const { setParams, deleteUrlParam } = useUrlParamsContext();

  // Functions
  function updateChatSearchTerm(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newChatSearchTerm = (event.target as HTMLInputElement).value;
      if (!newChatSearchTerm) return deleteUrlParam("chatSearchTerm");
      setParams({ chatSearchTerm: newChatSearchTerm });
    }
  }
  // Functions END

  return {
    dialogs,
    selectedChatId,
    selectChat,
    triggerFetchData,
    updateChatSearchTerm
  };
};
