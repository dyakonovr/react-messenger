import { Themes } from "@/src/types/general/theme";
import SettingsThemePickerItem from "./Item";
import { colorsByTheme } from "./constants";

interface IProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export function SettingsThemePicker({ theme, setTheme }: IProps) {
  return (
    <div className="mt-5 grid grid-cols-10 gap-5">
      {Object.values(Themes).map((t) => (
        <SettingsThemePickerItem
          startColor={colorsByTheme[t].startColor}
          endColor={colorsByTheme[t].endColor}
          onClick={() => setTheme(t)}
          isSelected={theme === t}
          key={t}
        />
      ))}
    </div>
  );
}
