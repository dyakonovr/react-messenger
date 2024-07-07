"use client";

import DialogService from "@/src/services/dialog";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import { useEffect } from "react";

export const useDialogsData = () => {
  const { dialogs, setNewDialogs, selectedDialogId, selectDialog } = useDialogsStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await DialogService.getAll({
          limit: 20,
          page: 1,
          searchTerm: ""
        });
        setNewDialogs(response.data.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return { dialogs, selectedDialogId, selectDialog };
};
