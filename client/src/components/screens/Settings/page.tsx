import { SettingsNavigation } from "./components";
import { SettingsAccountDataPanel, SettingsThemePanel } from "./screens";
import classes from "./styles.module.css";

function SettingsPage() {
  return (
    <div className={classes.settings_page}>
      <SettingsNavigation />
      {/* <SettingsAccountDataPanel /> */}
      <SettingsThemePanel />
    </div>
  );
}

export default SettingsPage;
