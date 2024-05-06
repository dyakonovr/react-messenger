import { Input } from "@/src/components/ui";
import { Search as SearchIcon } from "lucide-react";

export function ChatsSearchInput() {
  return (
    <div className="relative">
      <div className="absolute bottom-1/2 left-3 translate-y-2/4">
        <SearchIcon size={24} className="stroke-[var(--main-color)]" />
      </div>
      <Input className="pl-12" />
    </div>
  );
}
