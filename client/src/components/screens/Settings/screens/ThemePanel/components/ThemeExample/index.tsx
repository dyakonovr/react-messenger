import { Typography } from "@/src/components/ui";
import SettingsThemeExampleChat from "./Chat";

export function SettingsThemeExample() {
  return (
    <div className="mt-5">
      <Typography tag="h2" variant="regular">
        Example
      </Typography>
      <SettingsThemeExampleChat />
    </div>
  );
}
