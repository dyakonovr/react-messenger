import SettingsAccountDataForm from "./Form";
import { useTranslations } from "next-intl";
import { SettingsScreenTitle } from "../../components";
import { ScreenLayoutWithSidebarBackToSidebarButton } from "../../../../ui/ScreenLayoutWithSidebar/BackToSidebarButton";

export function SettingsAccountDataScreen() {
  const t = useTranslations("screens.Settings.Account_Data");

  return (
    <div className="default-page-offset">
      <div className="mb-5 flex items-center gap-3">
        <ScreenLayoutWithSidebarBackToSidebarButton />
        <SettingsScreenTitle>{t("title")}</SettingsScreenTitle>
      </div>
      <SettingsAccountDataForm />
    </div>
  );
}
