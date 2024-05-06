import { Button, Input } from "@/src/components/ui";
import { Send as SendIcon } from "lucide-react";

export function ChatFooter() {
  return (
    <div className="custom-shadow flex w-full items-center gap-6 p-5">
      <Input placeholder="Write a message ..." className="rounded-[10px] px-4 py-3.5" />
      <Button variant="contained" className="p-2.5">
        <SendIcon size={24} />
      </Button>
    </div>
  );
}
