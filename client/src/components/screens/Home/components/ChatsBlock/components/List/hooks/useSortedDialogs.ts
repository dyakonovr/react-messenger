import type { IDialogsRecord } from "@/src/types/features/dialog";
import type { Nullable } from "@/src/types/general/nullable";
import { useMemo } from "react";

export const useSortedDialogs = (dialogs: Nullable<IDialogsRecord>) => {
  const sortedDialogIds = useMemo(() => {
    if (!dialogs) return [];

    return Object.entries(dialogs)
      .sort(([keyA, dialogA], [keyB, dialogB]) => {
        if (dialogA.lastMessage === null && dialogB.lastMessage === null) return 0;
        if (dialogA.lastMessage === null) return 1;
        if (dialogB.lastMessage === null) return -1;
        return dialogB.lastMessage.createdAt.localeCompare(dialogA.lastMessage.createdAt);
      })
      .map(([id]) => id);
  }, [dialogs]);

  return sortedDialogIds;
};
