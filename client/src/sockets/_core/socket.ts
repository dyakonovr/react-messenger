// import type { Socket } from "socket.io-client";
// import { io } from "socket.io-client";

// export const customIo = () =>
//   io("http://localhost:8080", {
//     transports: ["websocket"],
//     withCredentials: true
//   });

// class SocketConnection {
//   private static instance: SocketConnection;
//   public socket: Socket;

//   private constructor() {
//     this.socket = customIo();

//     this.socket.on("connect", () => {
//       console.log("WebSocket connection established");
//     });

//     this.socket.on("disconnect", () => {
//       console.log("WebSocket connection disconnected");
//     });

//     this.socket.on("connect_error", (err) => {
//       console.error("Connection Error:", err.message);
//     });

//     this.socket.on("connect_timeout", (err) => {
//       console.error("Connection Timeout:", err.message);
//     });

//     // this.socket.on("message", (data) => {
//     //   console.log("Received message:", data);
//     //   // Handle received message
//     // });
//   }

//   public static getInstance(): SocketConnection {
//     if (!SocketConnection.instance) {
//       SocketConnection.instance = new SocketConnection();
//     }
//     return SocketConnection.instance;
//   }
// }

// export default SocketConnection;


import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export const customIo = () =>
  io("http://localhost:8080", {
    transports: ["websocket"],
    withCredentials: true
  });

class SocketConnection {
  public socket: Socket;

  public constructor() {
    this.socket = customIo();

    this.socket.on("connect", () => {
      console.log("WebSocket connection established");
    });

    this.socket.on("disconnect", () => {
      console.log("WebSocket connection disconnected");
    });

    this.socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    this.socket.on("connect_timeout", (err) => {
      console.error("Connection Timeout:", err.message);
    });

    // this.socket.on("message", (data) => {
    //   console.log("Received message:", data);
    //   // Handle received message
    // });
  }
}

export default SocketConnection;
