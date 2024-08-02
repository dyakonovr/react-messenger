"use client";

import { Button, Typography } from "@/src/components/ui";
import { SettingsThemeExample, SettingsThemePicker } from "./components";
import { useSettingsThemeScreen } from "./useSettingsThemeScreen";
import { useTranslations } from "next-intl";

export function SettingsThemeScreen() {
  const t = useTranslations("screens.Settings.Theme");
  const { localTheme, setLocalTheme, changeTheme } = useSettingsThemeScreen();

  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        {t("title")}
      </Typography>
      <SettingsThemePicker theme={localTheme} setTheme={setLocalTheme} />
      <SettingsThemeExample theme={localTheme} />
      <Button variant="contained" className="mt-5" onClick={changeTheme}>
        {t("update_button")}
      </Button>
    </div>
  );
}
