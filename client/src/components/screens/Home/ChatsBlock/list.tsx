import { Typography } from "@/src/components/ui";
import ChatItem from "./item";

function ChatsList() {
  return (
    <div className="mt-7">
      <hr className="mb-4 bg-[#B4B4B4]" />
      <Typography tag="p" variant="regular" className="mb-6 font-bold text-[#676667]">
        All chats
      </Typography>
      <div className="max-h-[650px] overflow-y-auto pr-3">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default ChatsList;
