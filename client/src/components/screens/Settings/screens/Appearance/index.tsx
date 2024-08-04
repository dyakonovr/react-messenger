"use client";

import { SettingsAppearanceLanguage } from "./components/Language";
import { SettingsAppearanceTheme } from "./components/Theme";

export function SettingsAppearanceScreen() {
  return (
    <div className="default-page-offset flex flex-col gap-10">
      <SettingsAppearanceTheme />
      <SettingsAppearanceLanguage />
    </div>
  );
}
