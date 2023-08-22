import { io } from "socket.io-client";

const socket = io("http://localhost:4444", { transports: ['websocket'] });
export default socket;