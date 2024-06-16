"use client";

import { Typography } from "@/src/components/ui";
import { FriendsHeaderFilters, FriendsHeaderInput } from "./components";

export function FriendsHeader() {
  return (
    <div className="flex items-center">
      <Typography tag="h1" variant="title">
        Friends
      </Typography>
      <FriendsHeaderInput />
      <FriendsHeaderFilters />
    </div>
  );
}
