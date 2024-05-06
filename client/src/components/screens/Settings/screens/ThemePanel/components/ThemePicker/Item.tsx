"use client";

interface ISettingsThemePickerItemProps {
  startColor: string;
  endColor: string;
}

function SettingsThemePickerItem({
  startColor,
  endColor
}: ISettingsThemePickerItemProps) {
  return (
    <div
      className="h-[100px] w-full cursor-pointer rounded-2xl border"
      style={{
        background: `linear-gradient(to bottom right, ${startColor} 50%, ${endColor})`
      }}
    ></div>
  );
}

export default SettingsThemePickerItem;
