import { Typography } from "@/src/components/ui";
import Image from "next/image";

export function SettingsProfilePreview() {
  return (
    <div className="flex">
      <Image
        src="https://avatar.iran.liara.run/public/9"
        width={60}
        height={60}
        alt="User avatar"
      />
      <Typography tag="p" variant="regular" className="ml-5 pt-1 font-bold">
        Pink Panda
      </Typography>
    </div>
  );
}
