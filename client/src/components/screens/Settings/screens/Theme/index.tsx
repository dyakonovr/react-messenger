"use client";

import { Button, Typography } from "@/src/components/ui";
import { SettingsThemeExample, SettingsThemePicker } from "./components";
import { useThemeChange } from "./useThemeChange";

export function SettingsThemeScreen() {
  const { localTheme, setLocalTheme, changeTheme } = useThemeChange();

  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        Theme
      </Typography>
      <SettingsThemePicker theme={localTheme} setTheme={setLocalTheme} />
      <SettingsThemeExample theme={localTheme} />
      <Button variant="contained" className="mt-5" onClick={changeTheme}>
        Update
      </Button>
    </div>
  );
}
