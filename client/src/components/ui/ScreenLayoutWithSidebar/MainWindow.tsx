"use client";

import type { ComponentProps, ReactNode } from "react";
import { clsx } from "clsx";
import { useScreenLayoutWithSidebarContext } from ".";

interface IProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const ScreenLayoutWithSidebarMainWindow = ({
  className,
  children,
  ...props
}: IProps) => {
  const { isSidebarOnFullMobileScreen, isTablet } = useScreenLayoutWithSidebarContext();
  const isHidden = isSidebarOnFullMobileScreen && isTablet;

  return (
    <div className={clsx(isHidden ? "hidden" : "w-full", className)} {...props}>
      {children}
    </div>
  );
};
