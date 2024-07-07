// import { useSocketContext } from "../../SocketProvider";

// const KEY_WORD = "MESSAGE";

// export const useMessagesSocket = () => {
//   const { isConnected, socket } = useSocketContext();

//   function sendMessage() {
//     if (!isConnected || !socket) return;

//     socket.emit(KEY_WORD + ":CREATE");
//   }

//   function onMessageCreated() {
//     if (!isConnected || !socket) return;

//     socket.on(KEY_WORD + ":CREATED", () => {
//       console.log("@message created");
//     });
//   }
// };
