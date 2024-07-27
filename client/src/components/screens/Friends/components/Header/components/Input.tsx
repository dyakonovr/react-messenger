"use client";

import { Input } from "@/src/components/ui";
import type { KeyboardEvent } from "react";
import { useUrlParamsContext } from "@/src/providers/UrlParamProvider/provider";

export function FriendsHeaderInput() {
  const { setParams, deleteUrlParam } = useUrlParamsContext();

  // Functions
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    const value = (event.target as HTMLInputElement).value;
    if (!value) deleteUrlParam("searchTerm");
    setParams({ searchTerm: value });
  }
  // Functions END

  return (
    <Input
      placeholder="Start typing..."
      className="ml-5 mr-7 w-full max-w-[500px]"
      onKeyDown={handleKeyDown}
    />
  );
}
