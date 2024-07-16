import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Nullable } from "../types/general/nullable";
import { devtools } from "zustand/middleware";
import type { IDialogsRecord } from "../types/features/dialog";

type State = {
  dialogs: Nullable<IDialogsRecord>;
  selectedDialogId: Nullable<string>;
};

type Actions = {
  setNewDialogs: (dialogs: IDialogsRecord) => void;
  selectDialog: (dialogId: Nullable<string>) => void;
  setLastMessageIsRead: (dialogId: string, messageId: string) => void;
};

export const useDialogsStore = create<State & Actions>()(
  devtools(
    immer((set) => ({
      dialogs: null,
      selectedDialogId: null,
      setNewDialogs: (dialogs: IDialogsRecord) =>
        set((state) => {
          if (state.dialogs === null) {
            state.dialogs = dialogs;
            return;
          }

          for (const key in dialogs) {
            const currentDialog = dialogs[key];
            state.dialogs[key] = currentDialog;
          }
        }),
      selectDialog: (dialogId: Nullable<string>) =>
        set((state) => {
          state.selectedDialogId = dialogId;
        }),
      setLastMessageIsRead: (dialogId: string, messageId: string) =>
        set((state) => {
          if (!state.dialogs) return;
          state.dialogs[dialogId].newMessagesCount = Math.max(
            0,
            state.dialogs[dialogId].newMessagesCount - 1
          );

          // isRead = true;
          if (
            state.dialogs[dialogId].lastMessage &&
            messageId === String(state.dialogs[dialogId].lastMessage.id)
          ) {
            state.dialogs[dialogId].lastMessage.isRead = true;
          }
        })
    }))
  )
);
