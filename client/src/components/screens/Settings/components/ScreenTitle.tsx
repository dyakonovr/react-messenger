import { Typography } from "@/src/components/ui";
import clsx from "clsx";
import type { ComponentProps } from "react";

type ITypoghraphyProps = ComponentProps<typeof Typography>;
interface IProps extends Omit<ITypoghraphyProps, "variant"> {
  variant?: ITypoghraphyProps["variant"];
}

export function SettingsScreenTitle({ children, variant, ...props }: IProps) {
  return (
    <Typography
      tag="h2"
      className={clsx("mb-5", props.className)}
      variant={variant || "subtitle"}
      {...props}
    >
      {children}
    </Typography>
  );
}
