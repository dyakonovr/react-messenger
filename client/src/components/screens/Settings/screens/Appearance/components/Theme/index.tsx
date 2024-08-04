"use client";

import { Button } from "@/src/components/ui";
import { SettingsThemeExample, SettingsThemePicker } from "./components";
import { useTranslations } from "next-intl";
import { useSettingsAppearanceTheme } from "./useSettingsThemeScreen";
import { SettingsScreenTitle } from "../../../../components";

export function SettingsAppearanceTheme() {
  const t = useTranslations("screens.Settings.Appearance.Theme");
  const { localTheme, setLocalTheme, changeTheme } = useSettingsAppearanceTheme();

  return (
    <div>
      <SettingsScreenTitle>{t("title")}</SettingsScreenTitle>
      <SettingsThemePicker theme={localTheme} setTheme={setLocalTheme} />
      <SettingsThemeExample theme={localTheme} />
      <Button variant="contained" className="mt-5" onClick={changeTheme}>
        {t("update_button")}
      </Button>
    </div>
  );
}
