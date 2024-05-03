import { ChatFooter, ChatHeader, ChatMessages } from "./components";

function Chat() {
  return (
    <div className="flex max-h-screen flex-col max-[840px]:hidden">
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
}

export default Chat;
