import { Button, Typography } from "@/src/components/ui";
import { SettingsPanelInput } from "./components";
import { SettingsPanelChangeAvatarInput } from "./components/ChangeAvatarInput";

export function SettingsAccountDataPanel() {
  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        Account Data
      </Typography>
      <div className="mt-5 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <SettingsPanelInput label="Nickname" />
          <SettingsPanelInput label="Mail" />
          <SettingsPanelInput label="Password" />
          <SettingsPanelChangeAvatarInput />
        </div>
        <Button variant="contained" className="w-fit">
          Update data
        </Button>
      </div>
    </div>
  );
}
