"use client";

import { Input } from "@/src/components/ui";
import { useQueryState } from "nuqs";
import type { KeyboardEvent } from "react";

export function FriendsHeaderInput() {
  const [_, setSearchTerm] = useQueryState("searchTerm");

  // Functions
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
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
