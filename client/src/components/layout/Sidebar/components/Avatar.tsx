"use client";

import { useUserStore } from "@/src/stores/user";
import { Avatar } from "../../../ui/Avatar";

export function SidebarAvatar() {
  const user = useUserStore((state) => state.user);
  // if (!user) throw new Error("Unexpected error in avatar");
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
