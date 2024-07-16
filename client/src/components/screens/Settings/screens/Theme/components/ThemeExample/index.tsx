import { Typography } from "@/src/components/ui";
import SettingsThemeExampleChat from "./Chat";
import type { Themes } from "@/src/types/general/theme";

export function SettingsThemeExample({ theme }: { theme: Themes }) {
  return (
    <div className="mt-5">
      <Typography tag="h2" variant="regular">
        Example
      </Typography>
      <SettingsThemeExampleChat theme={theme} />
    </div>
  );
}
