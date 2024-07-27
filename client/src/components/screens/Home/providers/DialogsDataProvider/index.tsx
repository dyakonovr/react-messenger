import type { Nullable } from "@/src/types/general/nullable";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useDialogsDataProvider } from "./hook";
import type { IDialogsRecord } from "@/src/types/features/dialog";

interface IDialogsDataContext {
  dialogs: Nullable<IDialogsRecord>;
  triggerFetchData: () => void;
}

export const DialogsDataContext = createContext<IDialogsDataContext | undefined>(
  undefined
);

export const DialogsDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DialogsDataContext.Provider value={useDialogsDataProvider()}>
      {children}
    </DialogsDataContext.Provider>
  );
};

export function useDialogsDataContext() {
  const context = useContext(DialogsDataContext);
  if (context === undefined) {
    throw new Error("useDialogsDataContext must be used within a DialogsDataProvider");
  }
  return context;
}
