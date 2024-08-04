import { useSettingsStore } from "@/src/stores/useSettingsStore";
import type { Themes } from "@/src/types/general/theme";
import { useState } from "react";

export const useSettingsAppearanceTheme = () => {
  const currentTheme = useSettingsStore((state) => state.theme);
  const setGlobalNewTheme = useSettingsStore((state) => state.setTheme);
  const [localTheme, setLocalTheme] = useState<Themes>(currentTheme);

  return { localTheme, setLocalTheme, changeTheme: () => setGlobalNewTheme(localTheme) };
};
