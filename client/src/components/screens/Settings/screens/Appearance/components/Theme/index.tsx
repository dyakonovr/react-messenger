"use client";

import { Button } from "@/src/components/ui";
import { SettingsThemeExample, SettingsThemePicker } from "./components";
import { useTranslations } from "next-intl";
import { useSettingsAppearanceTheme } from "./useSettingsThemeScreen";
import { SettingsScreenTitle } from "../../../../components";
import { ScreenLayoutWithSidebarBackToSidebarButton } from "../../../../../../ui/ScreenLayoutWithSidebar/BackToSidebarButton";

export function SettingsAppearanceTheme() {
  const t = useTranslations("screens.Settings.Appearance.Theme");
  const { localTheme, setLocalTheme, changeTheme } = useSettingsAppearanceTheme();

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <ScreenLayoutWithSidebarBackToSidebarButton />
        <SettingsScreenTitle>{t("title")}</SettingsScreenTitle>
      </div>
      <SettingsThemePicker theme={localTheme} setTheme={setLocalTheme} />
      <SettingsThemeExample theme={localTheme} />
      <Button variant="contained" className="mt-5" onClick={changeTheme}>
        {t("update_button")}
      </Button>
    </div>
  );
}
