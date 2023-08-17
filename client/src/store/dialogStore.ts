import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IFriend } from "../interfaces/IFriend";

interface IDialogState {
  currentDialogUser: IFriend | null;
  openDialog: (currentDialogUser: IFriend | null)  => void,
}

export const useDialogStore = create<IDialogState>()(immer((set) => ({
  currentDialogUser: null,
  openDialog: (currentDialogUser: IFriend | null) => set(state => {
    state.currentDialogUser = currentDialogUser;
  })
})));