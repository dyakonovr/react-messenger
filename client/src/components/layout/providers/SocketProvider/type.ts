import type { Socket } from "socket.io-client";

export interface ISocketContext {
  isConnected: boolean;
  socket: Socket | null;
}
