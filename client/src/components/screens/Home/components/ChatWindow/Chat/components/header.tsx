import { Avatar, Typography } from "@/src/components/ui";
import type { IUser } from "@/src/types/features/user";

export function ChatHeader({ user }: { user: Omit<IUser, "id"> | null }) {
  return (
    <div className="flex bg-[#F8FAFF] px-8 py-4">
      <Avatar
        alt={`${user?.nickname} avatar`}
        nickname={user?.nickname ?? ""}
        src={user?.avatar ?? ""}
      />

      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {user?.nickname}
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
