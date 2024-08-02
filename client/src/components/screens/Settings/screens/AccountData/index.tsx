import { Typography } from "@/src/components/ui";
import SettingsAccountDataForm from "./Form";
import { useTranslations } from "next-intl";

export function SettingsAccountDataScreen() {
  const t = useTranslations("screens.Settings.Account_Data");

  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        {t("title")}
      </Typography>
      <SettingsAccountDataForm />
    </div>
  );
}
