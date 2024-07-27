import { ChatFooter, ChatHeader, ChatMessages } from "./components";
import { useChatData } from "./hooks/useChatData";
import { useHandleEscapeClick } from "./hooks/useHandleEscapeClick";

function Chat() {
  useHandleEscapeClick();
  const { chatMessages, chatInfo, isLoading, triggerFetchData } = useChatData();

  return (
    <div className="flex max-h-screen flex-col max-[840px]:hidden">
      <ChatHeader info={chatInfo} isLoading={isLoading} />
      <ChatMessages
        messages={chatMessages}
        isChatLoading={isLoading}
        triggerFetchData={triggerFetchData}
      />
      <ChatFooter isLoading={isLoading} />
    </div>
  );
}

export default Chat;
