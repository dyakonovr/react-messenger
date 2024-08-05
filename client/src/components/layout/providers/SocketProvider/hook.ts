import { customIo } from "@/src/sockets/_core/socket";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

export const useSocket = () => {
  const [isConnected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = customIo();
    socketRef.current.on("connect", () => setConnected(true));
    socketRef.current.on("disconnect", () => setConnected(false));
  }, []);

  return { isConnected, socket: socketRef.current };
};
