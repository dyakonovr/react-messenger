import type { Locales } from "@/i18n";
import { Input, Typography } from "@/src/components/ui";
import clsx from "clsx";
import { forwardRef, type ComponentProps } from "react";

interface IProps extends ComponentProps<"input"> {
  label: string;
  value: Locales;
}

export const SettingsAppearanceLanguageFormItem = forwardRef<HTMLInputElement, IProps>(
  ({ label, value, className, ...props }, ref) => {
    return (
      <Typography
        variant="regular"
        tag="label"
        className="flex cursor-pointer items-center"
      >
        <Input
          type="radio"
          value={value}
          name="language"
          className={clsx("mr-2 !w-auto cursor-pointer", className)}
          ref={ref}
          {...props}
        />{" "}
        {label}
      </Typography>
    );
  }
);
