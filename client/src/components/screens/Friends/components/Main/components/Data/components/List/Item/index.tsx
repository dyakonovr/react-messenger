"use client";

import { Button, Typography, Avatar } from "@/src/components/ui";
import type { IFriendsPageUser } from "@/src/types/features/friend";
import {
  Plus as PlusIcon,
  X as DeleteIcon,
  Undo2 as UndoIcon,
  Check as CheckIcon
} from "lucide-react";
// import { FriendshipStatuses } from "@/src/enums/FriendshipStatuses";
import { useState, type ReactNode } from "react";
import { useFriendsRequestFunc } from "./useFriendsRequests";
import type { FriendsPageUsersType } from "@/src/services/friend";

interface IFriendItemProps {
  user: IFriendsPageUser;
  type: FriendsPageUsersType;
}

const buttonIcons: Record<FriendsPageUsersType, ReactNode> = {
  all: <PlusIcon />,
  sent: <UndoIcon />,
  friends: <DeleteIcon />,
  received: <CheckIcon />
};

const buttonTitles: Record<FriendsPageUsersType, string> = {
  all: "Add to friends",
  sent: "Undo request to friends",
  friends: "Remove from friends",
  received: "Accept request to friends"
};

export function FriendItem({ user, type }: IFriendItemProps) {
  const buttonCallback = useFriendsRequestFunc(user.id, type);
  const [isLoading, setIsLoading] = useState(false);

  // Functions
  function handleClick() {
    setIsLoading(true);
    buttonCallback();
  }
  // Functions END

  return (
    <div className="flex rounded-2xl bg-[var(--main-color)] p-4 transition-colors">
      <Avatar
        src={user.avatar}
        alt={`${user.nickname} avatar`}
        className="mb-auto rounded-full bg-white !text-[var(--main-color)]"
        nickname={user.nickname}
      />
      <Typography variant="regular" tag="p" className="ms-4 font-bold text-white">
        {user.nickname}
      </Typography>
      <Button
        isIcon
        variant="transparent"
        className="ms-auto border-2 border-white bg-white"
        title={buttonTitles[type]}
        loading={isLoading}
        onClick={handleClick}
      >
        {buttonIcons[type]}
      </Button>
    </div>
  );
}
