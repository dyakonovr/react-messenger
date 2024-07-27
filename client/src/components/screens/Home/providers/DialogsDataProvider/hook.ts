"use client";

import DialogService from "@/src/services/dialog";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import { useEffect, useRef, useState } from "react";
import { useUrlParamsContext } from "@/src/providers/UrlParamProvider/provider";

export const useDialogsDataProvider = () => {
  const { dialogs, dialogsBySearch, setNewDialogs, setNewDialogsBySearch } =
    useDialogsStore();

  const { getParamValue } = useUrlParamsContext();
  const chatSearchTerm = getParamValue("chatSearchTerm") ?? "";

  const [isFetching, setIsFetching] = useState(false);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);

  useEffect(() => {
    if (chatSearchTerm === "" && dialogs) return;
    fetchData(1, chatSearchTerm);
  }, [chatSearchTerm]);

  // Functions
  function triggerFetchData() {
    console.log("@chatSearchTerm: ", chatSearchTerm);
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
    triggerFetchData
  };
};
