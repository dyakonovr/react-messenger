"use client";

import type { ComponentProps } from "react";

interface IProps extends ComponentProps<"button"> {
  startColor: string;
  endColor: string;
  isSelected: boolean;
}

function SettingsThemePickerItem({
  startColor,
  endColor,
  isSelected,
  onClick,
  ...props
}: IProps) {
  return (
    <button
      type="button"
      className={`h-[100px] w-full cursor-pointer rounded-2xl border ${isSelected && "outline"}`}
      style={{
        background: `linear-gradient(to bottom right, ${startColor} 50%, ${endColor})`
      }}
      onClick={onClick}
      {...props}
    ></button>
  );
}

export default SettingsThemePickerItem;
