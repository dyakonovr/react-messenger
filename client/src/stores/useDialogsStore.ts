import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Nullable } from "../types/general/nullable";
import { devtools } from "zustand/middleware";
import type { IDialogsRecord } from "../types/features/dialog";

type State = {
  dialogs: Nullable<IDialogsRecord>;
  dialogsBySearch: Nullable<IDialogsRecord>;
};

type Actions = {
  setNewDialogs: (dialogs: IDialogsRecord) => void;
  updateDialog: (dialog: IDialogsRecord) => void;
  setNewDialogsBySearch: (dialogs: Nullable<IDialogsRecord>) => void;
  setLastMessageIsRead: (dialogId: string, messageId: string) => void;
  clearDialogs: () => void;
};

export const useDialogsStore = create<State & Actions>()(
  devtools(
    immer((set) => ({
      dialogs: null,
      dialogsBySearch: null,
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
      setNewDialogsBySearch: (dialogs: Nullable<IDialogsRecord>) =>
        set((state) => {
          if (state.dialogsBySearch === null) {
            state.dialogsBySearch = dialogs;
            return;
          }

          for (const key in dialogs) {
            const currentDialog = dialogs[key];
            state.dialogsBySearch[key] = currentDialog;
          }
        }),
      updateDialog: (dialog: IDialogsRecord) =>
        set((state) => {
          if (state.dialogs === null) {
            state.dialogs = dialog;
          }

          if (state.dialogsBySearch === null) {
            state.dialogsBySearch = dialog;
          }

          const key = Object.keys(dialog)[0];
          state.dialogs[key] = dialog[key];
          state.dialogsBySearch[key] = dialog[key];
        }),
      setLastMessageIsRead: (dialogId: string, messageId: string) =>
        set((state) => {
          if (state.dialogs) {
            state.dialogs[dialogId].newMessagesCount = Math.max(
              0,
              state.dialogs[dialogId].newMessagesCount - 1
            );

            if (
              state.dialogs[dialogId].lastMessage &&
              messageId === String(state.dialogs[dialogId].lastMessage.id)
            ) {
              state.dialogs[dialogId].lastMessage.isRead = true;
            }
          }

          if (state.dialogsBySearch) {
            state.dialogsBySearch[dialogId].newMessagesCount = Math.max(
              0,
              state.dialogsBySearch[dialogId].newMessagesCount - 1
            );

            if (
              state.dialogsBySearch[dialogId].lastMessage &&
              messageId === String(state.dialogsBySearch[dialogId].lastMessage.id)
            ) {
              state.dialogsBySearch[dialogId].lastMessage.isRead = true;
            }
          }
        }),
      clearDialogs: () =>
        set((state) => {
          state.dialogs = null;
          state.dialogsBySearch = null;
        })
    }))
  )
);
