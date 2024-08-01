import type { IChatMessages } from "@/src/types/features/chatMessages";
import { Typography } from "@/src/components/ui";
import { useChatMessagesList } from "./useChatMessagesList";
import { useEffect } from "react";

interface IProps {
  messages: IChatMessages;
  setIsLoading: (value: boolean) => void;
}

export function ChatMessagesList({ messages, setIsLoading }: IProps) {
  const { chatMessageBlock, isChatEmpty } = useChatMessagesList(messages);

  useEffect(() => {
    setIsLoading(!chatMessageBlock);
  }, [chatMessageBlock]);

  return isChatEmpty ? (
    <Typography variant="subtitle" tag="p" className="mx-auto">
      Send your first message!
    </Typography>
  ) : (
    chatMessageBlock
  );
}
