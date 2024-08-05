"use client";

import DialogService from "@/src/services/dialog";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import { useEffect, useRef, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { fetchDataErrorToast } from "@/src/utils/fetchDataErrorToast";
import { URL_ATTRIBUTE_CHAT_SEARCH_TERM } from "../../constants";

export const useDialogsDataProvider = () => {
  const { dialogs, dialogsBySearch, setNewDialogs, setNewDialogsBySearch } =
    useDialogsStore();

  const [chatSearchTerm] = useQueryState(
    URL_ATTRIBUTE_CHAT_SEARCH_TERM,
    parseAsString.withDefault("")
  );

  const [isFetching, setIsFetching] = useState(false);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);

  useEffect(() => {
    if (chatSearchTerm === "" && dialogs) return;
    fetchData(1, chatSearchTerm);
  }, [chatSearchTerm]);

  // Functions
  function triggerFetchData() {
    fetchData(pageRef.current + 1, chatSearchTerm);
  }

  async function fetchData(page: number, searchTerm: string) {
    if (isFetching || page > totalPagesRef.current) return;

    try {
      setIsFetching(true);
      const response = await DialogService.getAll({
        limit: 20,
        page,
        searchTerm
      });

      if (response.error !== null) {
        return fetchDataErrorToast(response.error);
      }

      if (response.data === null) throw new Error("Unexpected error");

      pageRef.current = page;
      totalPagesRef.current = response.data.totalPages;

      if (chatSearchTerm) return setNewDialogsBySearch(response.data.items);

      setNewDialogs(response.data.items);
      setNewDialogsBySearch(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }
  // Functions END

  return {
    dialogs: !chatSearchTerm ? dialogs : dialogsBySearch,
    isFetching,
    triggerFetchData
  };
};
