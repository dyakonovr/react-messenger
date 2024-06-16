"use client";

import { Input } from "@/src/components/ui";
// import { useSearchParams } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FriendsHeaderInput() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("searchTerm", inputValue);
      router.push(`${window.location.pathname}?${queryParams.toString()}`);
    }
  };

  return (
    <Input
      placeholder="Start typing..."
      className="ml-5 mr-7 w-full max-w-[500px]"
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
