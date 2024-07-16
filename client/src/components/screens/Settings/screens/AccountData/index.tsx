import { Typography } from "@/src/components/ui";
import SettingsAccountDataForm from "./Form";

export function SettingsAccountDataScreen() {
  return (
    <div className="default-page-offset">
      <Typography tag="h2" variant="subtitle">
        Account Data
      </Typography>
      <SettingsAccountDataForm />
    </div>
  );
}
