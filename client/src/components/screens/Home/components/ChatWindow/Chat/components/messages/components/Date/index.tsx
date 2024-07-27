import { Typography } from "@/src/components/ui";
import { ChatMessagesDateLine } from "./DateLine";

export function ChatMessagesDate({ date }: { date: string }) {
  return (
    <div className="flex w-full items-center gap-2 [&:not(:first-child)]:mt-10">
      <ChatMessagesDateLine />
      <Typography tag="p" variant="regular" className="font-bold">
        {date}
      </Typography>
      <ChatMessagesDateLine />
    </div>
  );
}
