import { Typography } from "@/src/components/ui";
import { SettingsMenu, SettingsProfilePreview } from "./components";

export function SettingsNavigation() {
  return (
    <div className="default-page-offset custom-shadow bg-[#F8FAFF]">
      <Typography tag="h1" variant="title">
        Settings
      </Typography>
      <div className="mt-11 flex flex-col gap-14">
        <SettingsProfilePreview />
        <SettingsMenu />
      </div>
    </div>
  );
}
