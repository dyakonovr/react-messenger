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
    <div className="flex h-full max-h-screen flex-col">
      <ChatHeader
        info={chatInfo}
        isLoading={isFetching && !isAdditionalMessagesFetching}
      />
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
