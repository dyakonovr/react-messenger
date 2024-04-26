import { ChatWindow, Chats } from "@/src/components/screens/Home/index";

export default function Home() {
  return (
    <main className="grid h-full grid-cols-[3fr_9fr]">
      <Chats />
      <ChatWindow />
    </main>
  );
}
