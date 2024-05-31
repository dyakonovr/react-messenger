"use client";

import { Button, Typography } from "@/src/components/ui";
import type { IFriendsPageUser } from "@/src/types/features/user";
import { Plus as PlusIcon, X as DeleteIcon } from "lucide-react";
import Image from "next/image";

function FriendItem({ user }: { user: IFriendsPageUser }) {
  return (
    <div className="flex rounded-2xl bg-[var(--main-color)] p-4 transition-colors">
      <Image
        src={user.avatar ?? "https://avatar.iran.liara.run/public/9"}
        width={48}
        height={48}
        alt={`${user.nickname} avatar`}
        className="mb-auto rounded-full"
      />
      <Typography variant="regular" tag="p" className="ms-4 font-bold text-white">
        {user.nickname} {user.id}
      </Typography>
      <Button
        isIcon
        variant="transparent"
        className="ms-auto border-2 border-white bg-white"
        title="Add to friends"
      >
        {user.isFriend ? <DeleteIcon /> : <PlusIcon />}
      </Button>
    </div>
  );
}

export default FriendItem;
