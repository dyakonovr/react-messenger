import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Themes } from "../types/general/theme";
import type { Languages } from "../types/general/languages";

type State = {
  theme: Themes;
  language: Languages;
};

type Actions = {
  setTheme: (theme: Themes) => void;
  setLanguage: (language: Languages) => void;
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
          }),
        setLanguage: (language: Languages) =>
          set((state) => {
            state.language = language;
          })
      })),
      { name: "settings-store" }
    )
  )
);
