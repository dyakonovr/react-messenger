"use client";

import { Typography } from "@/src/components/ui";
import { FriendsHeaderFilters, FriendsHeaderInput } from "./components";
import { useTranslations } from "next-intl";

export function FriendsHeader() {
  const t = useTranslations("screens.Friends");

  return (
    <div className="flex items-center">
      <Typography tag="h1" variant="title">
        {t("title")}
      </Typography>
      <FriendsHeaderInput />
      <FriendsHeaderFilters />
    </div>
  );
}
