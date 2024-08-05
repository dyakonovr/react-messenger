"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { ISocketContext } from "./type";
import { useSocket } from "./hook";

export const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, socket } = useSocket();

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
}
