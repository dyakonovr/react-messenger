import { ChatFooter, ChatHeader, ChatMessages } from "./components";
import { useChatData } from "./useChatData";

function Chat({ selectedDialogId }: { selectedDialogId: string }) {
  const { chatMessages, user } = useChatData(selectedDialogId);

  return (
    <div className="flex max-h-screen flex-col max-[840px]:hidden">
      <ChatHeader user={user} />
      <ChatMessages messages={chatMessages} />
      <ChatFooter />
    </div>
  );
}

export default Chat;
