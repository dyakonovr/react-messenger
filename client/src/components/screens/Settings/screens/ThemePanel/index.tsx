import { Button, Typography } from "@/src/components/ui";
import { SettingsThemeExample, SettingsThemePicker } from "./components";

export function SettingsThemePanel() {
  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        Theme
      </Typography>
      <SettingsThemePicker />
      <SettingsThemeExample />
      <Button variant="contained" className="mt-5">
        Update
      </Button>
    </div>
  );
}
