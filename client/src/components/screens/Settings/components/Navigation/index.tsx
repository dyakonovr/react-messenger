import { Typography } from "@/src/components/ui";
import { SettingsMenu, SettingsProfilePreview } from "./components";
import { useTranslations } from "next-intl";

export function SettingsNavigation() {
  const t = useTranslations("screens.Settings.Sidebar");

  return (
    <div className="default-page-offset custom-shadow h-full bg-[#F8FAFF]">
      <Typography tag="h1" variant="title">
        {t("title")}
      </Typography>
      <div className="mt-11 flex flex-col gap-14">
        <SettingsProfilePreview />
        <SettingsMenu />
      </div>
    </div>
  );
}
