import { PagePaths } from "@/src/enums/PagePaths";
import SettingsMenuItem from "./Item";
import {
  Bell as BellIcon,
  CircleUser as CircleUserIcon,
  Languages as LanguagesIcon,
  LockKeyhole as LockIcon,
  Palette as PaletteIcon
} from "lucide-react";
import { useTranslations } from "next-intl";

export function SettingsMenu() {
  const t = useTranslations("screens.Settings.Sidebar.menu_items");
  
  return (
    <div className="flex flex-col">
      <SettingsMenuItem
        icon={<CircleUserIcon />}
        name={t("account_data")}
        href={PagePaths.SETTINGS.HOME}
      />
      {/* <SettingsMenuItem icon={<LockIcon />} name="Privacy" /> */}
      <SettingsMenuItem
        icon={<PaletteIcon />}
        name={t("theme")}
        href={PagePaths.SETTINGS.THEME}
      />
      {/* <SettingsMenuItem icon={<BellIcon />} name="Notifications" /> */}
      {/* <SettingsMenuItem icon={<LanguagesIcon />} name="Language" /> */}
    </div>
  );
}
