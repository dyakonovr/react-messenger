import { Input, Typography } from "@/src/components/ui";
import type { ComponentProps } from "react";

interface ISettingsPanelInputProps extends ComponentProps<"input"> {
  label: string;
}

export function SettingsPanelInput({ label, ...props }: ISettingsPanelInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typography tag="label" variant="regular">
        {label}
      </Typography>
      <Input placeholder={label} {...props} />
    </div>
  );
}
