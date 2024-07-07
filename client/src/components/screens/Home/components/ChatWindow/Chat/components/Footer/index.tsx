import { Button, Input } from "@/src/components/ui";
import { Send as SendIcon } from "lucide-react";
import { useSocketContext } from "../../../../../../../layout/SocketProvider";
import type { SendMessageFormSchemaType } from "./constants";
import { sendMessageFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ISendMessage } from "@/src/types/features/message";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import MessageSocket from "@/src/sockets/message";

export function ChatFooter() {
  const { isConnected, socket } = useSocketContext();
  const selectedDialogId = useDialogsStore((state) => state.selectedDialogId);
  const { register, handleSubmit, reset } = useForm<SendMessageFormSchemaType>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues: {
      text: ""
    }
  });

  // Functions
  function onSubmit(data: SendMessageFormSchemaType) {
    if (!isConnected || !socket || !selectedDialogId) return;

    MessageSocket.sendMessage(socket, { ...data, friendId: selectedDialogId });
    reset();
  }
  // Functions END

  return (
    <form
      className="custom-shadow flex w-full items-center gap-6 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Write a message ..."
        className="rounded-[10px] px-4 py-3.5"
        {...register("text")}
      />
      <Button isIcon variant="contained" className="p-2.5" type="submit">
        <SendIcon size={24} />
      </Button>
    </form>
  );
}
