import { ChatFooter, ChatHeader, ChatMessages } from "./components";
import { useChatData } from "./useChatData";

function Chat({ selectedDialogId }: { selectedDialogId: string }) {
  const { chatMessages, info } = useChatData(selectedDialogId);

  return (
    <div className="flex max-h-screen flex-col max-[840px]:hidden">
      <ChatHeader info={info} />
      <ChatMessages messages={chatMessages} />
      <ChatFooter />
    </div>
  );
}

export default Chat;
