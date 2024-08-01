import { ChatFooter, ChatHeader, ChatMessages } from "./components";
import { useChatData } from "./hooks/useChatData";
import { useHandleEscapeClick } from "./hooks/useHandleEscapeClick";

function Chat() {
  useHandleEscapeClick();
  const {
    chatMessages,
    chatInfo,
    isFetching,
    isAdditionalMessagesFetching,
    triggerFetchData
  } = useChatData();

  return (
    <div className="flex max-h-screen flex-col max-[840px]:hidden">
      <ChatHeader info={chatInfo} isLoading={isFetching} />
      <ChatMessages
        messages={chatMessages}
        isChatFetching={isFetching}
        isAdditionalMessagesFetching={isAdditionalMessagesFetching}
        triggerFetchData={triggerFetchData}
      />
      <ChatFooter isLoading={isFetching} />
    </div>
  );
}

export default Chat;
