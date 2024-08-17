import { PagePaths } from "@/src/enums/PagePaths";
import SettingsMenuItem from "./Item";
import { CircleUser as CircleUserIcon, Paintbrush as PaintbrushIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function SettingsMenu() {
  const t = useTranslations("screens.Settings.Sidebar.menu_items");

  return (
    <div className="flex flex-col">
      <SettingsMenuItem
        icon={<CircleUserIcon />}
        itemText={t("account_data")}
        href={PagePaths.SETTINGS.HOME}
      />
      {/* <SettingsMenuItem icon={<LockIcon />} name="Privacy" /> */}
      <SettingsMenuItem
        icon={<PaintbrushIcon />}
        itemText={t("appearance")}
        href={PagePaths.SETTINGS.APPEARANCE}
      />
      {/* <SettingsMenuItem icon={<BellIcon />} name="Notifications" /> */}
      {/* <SettingsMenuItem icon={<LanguagesIcon />} name={t("language")} href={""} /> */}
    </div>
  );
}
