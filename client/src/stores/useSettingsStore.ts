import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Themes } from "../types/general/theme";

type State = {
  theme: Themes;
};

type Actions = {
  setTheme: (theme: Themes) => void;
};

export const useSettingsStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        theme: Themes.WHITE_BLUE,
        language: "en",
        setTheme: (theme: Themes) =>
          set((state) => {
            state.theme = theme;
          })
      })),
      { name: "settings-store" }
    )
  )
);
