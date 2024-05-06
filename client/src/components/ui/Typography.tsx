import clsx from "clsx";
import type { ReactNode } from "react";

type Tag = "div" | "span" | "h1" | "h2" | "p" | "label";
type TypographyVariant = "title" | "subtitle" | "regular" | "small";

interface ITypographyProps {
  tag?: Tag;
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

type StylesType = { [key in TypographyVariant]: string };
const styles: StylesType = {
  title: "text-[32px] font-bold",
  subtitle: "text-[24px] font-bold",
  regular: "text-base",
  small: "text-sm"
};

export const Typography: React.FC<ITypographyProps> = ({
  tag = "div",
  children,
  variant,
  className
}) => {
  const Component = tag;

  return (
    <Component className={clsx("m-0 p-0", styles[variant], className)}>
      {children}
    </Component>
  );
};
