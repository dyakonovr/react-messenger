import { Button, Input, Typography } from "@/src/components/ui";

export function SettingsPanelChangeAvatarInput() {
  return (
    <div className="flex flex-col gap-2">
      <Typography tag="label" variant="regular">
        Avatar
      </Typography>
      <div className="flex gap-3">
        <Input type="file" placeholder="" className="cursor-pointer !p-0" />
        <Button variant="contained" className="py-1">
          Set&nbsp;default
        </Button>
      </div>
    </div>
  );
}
