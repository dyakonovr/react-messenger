import { Input, Typography } from "@/src/components/ui";
import { Search } from "lucide-react";
import ChatsList from "./list";

export function Chats() {
  return (
    <div className="custom-shadow z-[1] w-full bg-[#F8FAFF] p-[30px]">
      <Typography tag="h1" variant="title" className="mb-7">
        Chats
      </Typography>
      <Input
        startIconSlot={<Search size={24} className="stroke-[var(--main-color)]" />}
      />
      <ChatsList />
    </div>
  );
}
