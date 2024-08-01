import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";
import { useUnreadMessagesProvider } from "./hook";

const ReadMessagesContext = createContext<
  undefined | { markMessageAsRead: (messageId: string) => void }
>(undefined);

interface IProps {
  children: ReactNode;
}

export const UnreadMessagesProvider = ({ children }: IProps) => {
  const markMessageAsRead = useUnreadMessagesProvider();

  return (
    <ReadMessagesContext.Provider value={{ markMessageAsRead }}>
      {children}
    </ReadMessagesContext.Provider>
  );
};

export const useUnreadMessagesContext = () => {
  const context = useContext(ReadMessagesContext);
  if (context === undefined) {
    throw new Error("useReadMessages must be used within a UnreadMessagesProvider");
  }
  return context;
};
