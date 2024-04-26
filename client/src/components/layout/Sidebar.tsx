"use client";

import { Button } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import {
  MessageCircleMore as ChatIcon,
  UsersRound as FriendsIcon,
  Settings as SettingsIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 bg-[#F0F4FA] p-6">
      <Link href={PagePaths.HOME}>
        <Button variant={pathname === PagePaths.HOME ? "contained" : "transparent"}>
          <ChatIcon />
        </Button>
      </Link>
      <Link href={PagePaths.FRIENDS}>
        <Button variant={pathname === PagePaths.FRIENDS ? "contained" : "transparent"}>
          <FriendsIcon />
        </Button>
      </Link>
      <hr className="bg-[#B4B4B4]" />
      <Link href={PagePaths.SETTINGS}>
        <Button variant={pathname === PagePaths.SETTINGS ? "contained" : "transparent"}>
          <SettingsIcon />
        </Button>
      </Link>
      <Image
        src="https://avatar.iran.liara.run/public/9"
        width={48}
        height={48}
        alt="User avatar"
        className="mt-auto"
      />
    </div>
  );
}
