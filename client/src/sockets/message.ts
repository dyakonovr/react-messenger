import type { Socket } from "socket.io-client";
import type { IReadMessage, ISendMessage } from "../types/features/message";
import type { IDialogsRecord } from "../types/features/dialog";
import type { IReadMessageResponse } from "../components/screens/Home/useMessageSocketHandlers";

class MessageSocket {
  sendMessage(socket: Socket, payload: ISendMessage) {
    socket.emit("MESSAGE:CREATE", JSON.stringify(payload));
  }

  onMessageCreated(socket: Socket, callback: (data: IDialogsRecord) => void) {
    socket.on("MESSAGE:CREATED", callback);
  }

  offMessageCreated(socket: Socket) {
    socket.off("MESSAGE:CREATED");
  }

  readMessages(socket: Socket, data: IReadMessage) {
    socket.emit("MESSAGE:READ", JSON.stringify(data));
  }

  onMessageRead(socket: Socket, callback: (data: IReadMessageResponse) => void) {
    socket.on("MESSAGE:READ", callback);
  }

  offMessageRead(socket: Socket) {
    socket.off("MESSAGE:READ");
  }
}

export default new MessageSocket();
