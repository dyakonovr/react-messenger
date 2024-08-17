"use client";

import { useSettingsStore } from "@/src/stores/useSettingsStore";
import { useEffect } from "react";

export const useSetTheme = () => {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
};
