import { useTranslations } from "next-intl";
import { SettingsAppearanceLanguageForm } from "./Form";
import { SettingsScreenTitle } from "../../../../components";

export function SettingsAppearanceLanguage() {
  const t = useTranslations("screens.Settings.Appearance.Language");

  return (
    <div>
      <SettingsScreenTitle className="mb-0">{t("title")}</SettingsScreenTitle>
      <SettingsAppearanceLanguageForm />
    </div>
  );
}
