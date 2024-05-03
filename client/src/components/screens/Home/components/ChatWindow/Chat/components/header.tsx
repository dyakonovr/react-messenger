import { Typography } from "@/src/components/ui";
import Image from "next/image";

export function ChatHeader() {
  return (
    <div className="flex bg-[#F8FAFF] px-8 py-4">
      <Image
        src="https://avatar.iran.liara.run/public/9"
        width={48}
        height={48}
        alt="User avatar"
        className="h-fit"
      />
      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          Pink Panda
        </Typography>
        <Typography
          variant="small"
          tag="p"
          className="max-w-[250px] truncate text-[#7C7C7D]"
        >
          Online
        </Typography>
      </div>
    </div>
  );
}