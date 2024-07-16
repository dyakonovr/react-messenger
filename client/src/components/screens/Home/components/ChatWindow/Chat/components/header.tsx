import { Avatar, Typography } from "@/src/components/ui";
import type { IDialogInfo } from "@/src/types/features/dialog";

export function ChatHeader({ info }: { info: IDialogInfo | null }) {
  return (
    <div className="flex bg-[#F8FAFF] px-8 py-4">
      <Avatar
        alt={`${info?.name} avatar`}
        nickname={info?.name ?? ""}
        src={info?.avatar ?? ""}
      />

      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {info?.name}
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
