import { Avatar, Typography } from "@/src/components/ui";
import type { IDialogInfo } from "@/src/types/features/dialog";

interface IProps {
  info: IDialogInfo | null;
  isLoading: boolean;
}

export function ChatHeader({ info, isLoading }: IProps) {
  return (
    <div className="flex bg-[#F8FAFF] px-8 py-4">
      <Avatar
        alt={`${info?.name} avatar`}
        nickname={info?.name ?? ""}
        src={info?.avatar ?? ""}
        isLoading={isLoading}
      />

      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {isLoading ? "Loading..." : info?.name}
        </Typography>
      </div>
    </div>
  );
}
