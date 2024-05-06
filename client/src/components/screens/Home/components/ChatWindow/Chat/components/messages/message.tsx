import { Typography } from "@/src/components/ui";

function ChatMessage() {
  const isMyMessage = true;
  const messageStyles = !isMyMessage
    ? "bg-white text-[#696969]"
    : "bg-[var(--main-color)] text-white";
  return (
    <div className={`flex ${isMyMessage && "justify-end self-end"}`}>
      <Typography
        tag="p"
        variant="regular"
        className={`flex max-w-[85%] items-center justify-center rounded-2xl px-5 py-3 ${messageStyles}`}
      >
        Hi, How are ya? Hi, How are ya? Hi, How are ya? Hi, How are ya? Hi, How are ya?Hi,
      </Typography>
      <Typography
        variant="small"
        tag="span"
        className="-mb-1 ms-2 block self-end text-xs text-[#888]"
      >
        22:22
      </Typography>
    </div>
  );
}

export default ChatMessage;
