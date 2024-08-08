"use client";

import { PagePaths } from "@/src/enums/PagePaths";
import {
  MessageCircleMore as ChatIcon,
  UsersRound as FriendsIcon,
  Settings as SettingsIcon
} from "lucide-react";
import { usePathname } from "@/src/utils/navigation";
import { SidebarLogoutButton, LayoutSidebarButton, SidebarAvatar } from "./components";
import classes from "./styles.module.css";

export function LayoutSidebar() {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col gap-3 p-6 ${classes["sidebar-background"]} max-[768px]:flex-row max-[768px]:justify-between`}
    >
      <LayoutSidebarButton
        link={PagePaths.HOME}
        icon={<ChatIcon />}
        pathname={pathname}
      />
      <LayoutSidebarButton
        link={PagePaths.FRIENDS}
        icon={<FriendsIcon />}
        pathname={pathname}
      />
      <hr className="bg-[#B4B4B4] max-[768px]:hidden" />
      <LayoutSidebarButton
        link={PagePaths.SETTINGS.HOME}
        icon={<SettingsIcon />}
        pathname={pathname}
      />

      <SidebarLogoutButton />
      <SidebarAvatar />
    </div>
  );
}
