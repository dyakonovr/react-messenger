import type { Socket } from "socket.io-client";
import type { IReadMessage, ISendMessage } from "../types/features/message";
import type { IDialogsRecord } from "../types/features/dialog";
import type { IReadMessageResponse } from "../components/screens/Home/hooks/useMessageSocketHandlers";

class MessageSocket {
  prefix: string = "MESSAGE";

  sendMessage(socket: Socket, payload: ISendMessage) {
    socket.emit(`${this.prefix}:CREATE`, JSON.stringify(payload));
  }

  onMessageCreated(socket: Socket, callback: (data: IDialogsRecord) => void) {
    socket.on(`${this.prefix}:CREATED`, callback);
  }

  offMessageCreated(socket: Socket) {
    socket.off(`${this.prefix}:CREATED`);
  }

  readMessages(socket: Socket, data: IReadMessage) {
    socket.emit(`${this.prefix}:READ`, JSON.stringify(data));
  }

  onMessageRead(socket: Socket, callback: (data: IReadMessageResponse) => void) {
    socket.on(`${this.prefix}:READ`, callback);
  }

  offMessageRead(socket: Socket) {
    socket.off(`${this.prefix}:READ`);
  }
}

export default new MessageSocket();
