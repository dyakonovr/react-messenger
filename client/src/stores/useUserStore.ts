import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IUser } from "../types/features/user";
import type { Nullable } from "../types/general/nullable";
import { devtools } from "zustand/middleware";

type State = {
  user: Nullable<IUser>;
};

type Actions = {
  setUser: (user: IUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<State & Actions>()(
  devtools(
    immer((set) => ({
      user: null,
      setUser: (user: IUser) =>
        set((state) => {
          state.user = user;
        }),
      clearUser: () =>
        set((state) => {
          state.user = null;
        })
    }))
  )
);
