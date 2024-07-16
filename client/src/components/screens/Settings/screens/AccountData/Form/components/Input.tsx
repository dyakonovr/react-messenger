import { Input, Typography } from "@/src/components/ui";
import { forwardRef, type ComponentProps } from "react";
import type { FieldError } from "react-hook-form";

interface ISettingsPanelInputProps extends ComponentProps<"input"> {
  label: string;
  error: FieldError | undefined;
}

export const SettingsPanelInput = forwardRef<HTMLInputElement, ISettingsPanelInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Typography tag="label" variant="regular">
          {label}
        </Typography>
        <Input placeholder={label} {...props} ref={ref} />
        <Typography tag="p" variant="regular" className="text-red-600">
          {error?.message}
        </Typography>
      </div>
    );
  }
);
