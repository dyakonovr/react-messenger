import SettingsThemePickerItem from "./Item";

export function SettingsThemePicker() {
  return (
    <div className="mt-5 grid grid-cols-10 gap-5">
      <SettingsThemePickerItem startColor="#fff" endColor="var(--main-color)" />
      <SettingsThemePickerItem startColor="#fff" endColor="#ef4444" />
      <SettingsThemePickerItem startColor="#fff" endColor="#10b981" />
      <SettingsThemePickerItem startColor="#fff" endColor="#8b5cf6" />
      <SettingsThemePickerItem startColor="#fff" endColor="#d946ef" />
    </div>
  );
}
