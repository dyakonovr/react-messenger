"use client";

import { Input } from "@/src/components/ui";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import type { KeyboardEvent } from "react";

export function FriendsHeaderInput() {
  const [, setSearchTerm] = useQueryState("searchTerm");
  const t = useTranslations("screens.Friends");

  // Functions
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
  }
  // Functions END

  return (
    <Input
      placeholder={t("search_input_placeholder")}
      className="w-full max-w-[500px]"
      onKeyDown={handleKeyDown}
    />
  );
}
