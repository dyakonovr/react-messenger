import { PagePaths } from "@/src/enums/PagePaths";
import SettingsMenuItem from "./Item";
import {
  Bell as BellIcon,
  CircleUser as CircleUserIcon,
  Languages as LanguagesIcon,
  LockKeyhole as LockIcon,
  Palette as PaletteIcon
} from "lucide-react";

export function SettingsMenu() {
  return (
    <div className="flex flex-col">
      <SettingsMenuItem
        icon={<CircleUserIcon />}
        name="Account Data"
        href={PagePaths.SETTINGS.HOME}
      />
      {/* <SettingsMenuItem icon={<LockIcon />} name="Privacy" /> */}
      <SettingsMenuItem
        icon={<PaletteIcon />}
        name="Theme"
        href={PagePaths.SETTINGS.THEME}
      />
      {/* <SettingsMenuItem icon={<BellIcon />} name="Notifications" /> */}
      {/* <SettingsMenuItem icon={<LanguagesIcon />} name="Language" /> */}
    </div>
  );
}
