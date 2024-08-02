import SettingsPageLayout from "@/src/components/screens/Settings/layout";
import type { ReactNode } from "react";

export default function SettignsLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <SettingsPageLayout>{children}</SettingsPageLayout>;
}
