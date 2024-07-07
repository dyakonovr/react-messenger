"use client";

import { Avatar } from "@/src/components/ui";
import { useUserStore } from "@/src/stores/useUserStore";

export function SidebarAvatar() {
  const user = useUserStore((state) => state.user);
  if (!user) return null;

  return (
    <Avatar
      src={user.avatar}
      alt="My avatar"
      nickname={user.nickname}
      className="mt-auto"
    />
  );
}
