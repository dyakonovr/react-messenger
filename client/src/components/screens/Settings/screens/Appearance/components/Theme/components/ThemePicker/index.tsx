import { Themes } from "@/src/types/general/theme";
import SettingsThemePickerItem from "./Item";
import { colorsByTheme } from "./constants";

interface IProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export function SettingsThemePicker({ theme, setTheme }: IProps) {
  return (
    <div className="mt-5 grid grid-cols-8 gap-5 max-[1500px]:grid-cols-4 max-[1000px]:grid-cols-3 max-[576px]:grid-cols-2">
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
