import Chat from "./Chat";
import SelectChatWindow from "./SelectChatWindow";

export function ChatWindow() {
  const isChatSelected = true;
  return isChatSelected ? <Chat /> : <SelectChatWindow />;
}
