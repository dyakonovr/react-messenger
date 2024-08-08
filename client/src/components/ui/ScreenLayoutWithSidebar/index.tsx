"use client";

import type { ComponentProps, ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import classes from "./styles.module.css";
import { clsx } from "clsx";
import { useMediaQuery } from "@/src/hooks/general/useMediaQuery";

interface IContext {
  isSidebarOnFullMobileScreen: boolean;
  isTablet: boolean;
  setIsSidebarOnFullMobileScreen: (value: boolean) => void;
}

export const ScreenLayoutWithSidebarContext = createContext<IContext | null>(null);

interface IProps extends ComponentProps<"div"> {
  isSidebarShowedByDefault?: boolean;
  children: ReactNode;
}

export const ScreenLayoutWithSidebar = ({
  isSidebarShowedByDefault = true,
  className,
  children,
  ...props
}: IProps) => {
  const [isSidebarOnFullMobileScreen, setIsSidebarOnFullMobileScreen] = useState(
    isSidebarShowedByDefault
  );
  const isTablet = useMediaQuery("(max-width: 840px)");

  return (
    <ScreenLayoutWithSidebarContext.Provider
      value={{ isSidebarOnFullMobileScreen, isTablet, setIsSidebarOnFullMobileScreen }}
    >
      <div
        className={clsx("h-full overflow-y-auto", classes.layout, className)}
        {...props}
      >
        {children}
      </div>
    </ScreenLayoutWithSidebarContext.Provider>
  );
};

export const useScreenLayoutWithSidebarContext = () => {
  const context = useContext(ScreenLayoutWithSidebarContext);
  if (!context) {
    throw new Error("MainWindow must be used within a Layout component");
  }

  return context;
};
