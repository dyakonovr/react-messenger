import ChatFooter from "./footer";
import ChatHeader from "./header";
import ChatMessages from "./messages";

function Chat() {
  return (
    <div className="flex flex-col max-[840px]:hidden">
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
}

export default Chat;
