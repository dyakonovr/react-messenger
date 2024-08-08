"use client";

import { Typography } from "@/src/components/ui";
import { FriendsHeaderFilters, FriendsHeaderInput } from "./components";
import { useTranslations } from "next-intl";

export function FriendsHeader() {
  const t = useTranslations("screens.Friends");

  return (
    <div className="flex flex-wrap items-center gap-7">
      <div className="flex items-center gap-5">
        <Typography tag="h1" variant="title">
          {t("title")}
        </Typography>
        <FriendsHeaderInput />
      </div>
      <FriendsHeaderFilters />
    </div>
  );
}
