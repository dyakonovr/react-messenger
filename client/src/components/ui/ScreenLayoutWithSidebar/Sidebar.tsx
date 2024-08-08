"use client";

import type { ComponentProps, ReactNode } from "react";
import { useScreenLayoutWithSidebarContext } from ".";
import { clsx } from "clsx";

interface IProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const ScreenLayoutWithSidebarSidebar = ({
  className,
  children,
  ...props
}: IProps) => {
  const { isSidebarOnFullMobileScreen, isTablet } = useScreenLayoutWithSidebarContext();
  const isHidden = !isSidebarOnFullMobileScreen && isTablet;

  return (
    <div className={clsx(isHidden ? "hidden" : "w-full", className)} {...props}>
      {children}
    </div>
  );
};
