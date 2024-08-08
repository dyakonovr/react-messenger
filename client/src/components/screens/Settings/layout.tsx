import type { ReactNode } from "react";
import { SettingsNavigation } from "./components";
import { ScreenLayoutWithSidebar } from "../../ui";
import { ScreenLayoutWithSidebarSidebar } from "../../ui/ScreenLayoutWithSidebar/Sidebar";
import { ScreenLayoutWithSidebarMainWindow } from "../../ui/ScreenLayoutWithSidebar/MainWindow";

function SettingsPageLayout({ children }: { children: ReactNode }) {
  return (
    <ScreenLayoutWithSidebar>
      <ScreenLayoutWithSidebarSidebar>
        <SettingsNavigation />
      </ScreenLayoutWithSidebarSidebar>
      <ScreenLayoutWithSidebarMainWindow>{children}</ScreenLayoutWithSidebarMainWindow>
    </ScreenLayoutWithSidebar>
  );
}

export default SettingsPageLayout;
