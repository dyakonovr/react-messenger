import type { ReactNode } from "react";
import { SettingsNavigation } from "./components";
import classes from "./styles.module.css";

function SettingsPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={classes.settings_page}>
      <SettingsNavigation />
      {children}
    </div>
  );
}

export default SettingsPageLayout;
