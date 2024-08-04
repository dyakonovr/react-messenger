import SettingsAccountDataForm from "./Form";
import { useTranslations } from "next-intl";
import { SettingsScreenTitle } from "../../components";

export function SettingsAccountDataScreen() {
  const t = useTranslations("screens.Settings.Account_Data");

  return (
    <div className="default-page-offset">
      <SettingsScreenTitle>{t("title")}</SettingsScreenTitle>
      <SettingsAccountDataForm />
    </div>
  );
}
