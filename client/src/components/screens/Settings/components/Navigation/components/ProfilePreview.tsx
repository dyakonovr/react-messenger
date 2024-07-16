"use client";

import { Avatar, Typography } from "@/src/components/ui";
import { useUserStore } from "@/src/stores/useUserStore";

export function SettingsProfilePreview() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex">
      <Avatar
        alt="User avatar"
        nickname={user?.nickname || ""}
        src={user?.avatar || ""}
      />
      <Typography tag="p" variant="regular" className="ml-3 pt-1 font-bold">
        {user?.nickname}
      </Typography>
    </div>
  );
}
