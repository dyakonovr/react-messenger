import { Typography } from "@/src/components/ui";
import SettingsThemeExampleChat from "./Chat";
import type { Themes } from "@/src/types/general/theme";
import { useTranslations } from "next-intl";

export function SettingsThemeExample({ theme }: { theme: Themes }) {
  const t = useTranslations("screens.Settings.Theme");

  return (
    <div className="mt-5">
      <Typography tag="h2" variant="regular">
        {t("example_label")}
      </Typography>
      <SettingsThemeExampleChat theme={theme} />
    </div>
  );
}
