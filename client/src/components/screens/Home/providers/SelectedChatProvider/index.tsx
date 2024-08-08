"use client";

import type { Nullable } from "@/src/types/general/nullable";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useSelectedChatProvider } from "./hook";

interface ISelectedChatContext {
  selectedChatId: Nullable<string>;
  selectChat: (chatId: Nullable<string>) => void;
}

export const SelectedChatContext = createContext<ISelectedChatContext | undefined>(
  undefined
);

export const SelectedChatProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SelectedChatContext.Provider value={useSelectedChatProvider()}>
      {children}
    </SelectedChatContext.Provider>
  );
};

export function useSelectedChatContext() {
  const context = useContext(SelectedChatContext);
  if (context === undefined) {
    throw new Error("useSelectedChatContext must be used within a SelectedChatProvider");
  }
  return context;
}
