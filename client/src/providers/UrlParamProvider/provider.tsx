"use client";

import React, { createContext, useContext } from "react";
import { useUrlParamsProvider } from "./hook";
import type { UrlParamsContextType } from "./type";

const UrlParamsContext = createContext<UrlParamsContextType | null>(null);

export const UrlParamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <UrlParamsContext.Provider value={useUrlParamsProvider()}>
      {children}
    </UrlParamsContext.Provider>
  );
};

export const useUrlParamsContext = () => {
  const context = useContext(UrlParamsContext);
  if (!context) {
    throw new Error("useUrlParams must be used within a UrlParamsProvider");
  }
  return context;
};
