import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { checkAuth } from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as MessageController from "./controllers/MessagesController.js";
import { registerValidation } from "./validators/register.js";
import { loginValidation } from "./validators/login.js";
import MessageModel from "./models/Message.js";
import { getUserIdByToken } from "./utils/getUserIdByToken.js";

mongoose.connect("mongodb+srv://admin:wwwwww@cluster1.xialhyu.mongodb.net/messenger?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  }).catch((error) => {
    console.log(`DB error: ${error}`);
  });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4444",
    methods: ["GET", "POST", "PUT"]
  }
});

app.use(express.json());
app.use(cors());

const allSockets = {};

io.on("connection", (socket) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const userId = getUserIdByToken(token);
    allSockets[userId] = socket.id;
  }

  socket.on('MESSAGE:SEND', (data) => {
    console.log('Received message:', data);
    const { text, sender, recipient } = data;
    const newMessage = new MessageModel({ text, sender, recipient });

    newMessage.save()
      .then(() => {
        console.log("New message in DB:", newMessage);
        io.to(allSockets[recipient]).emit('MESSAGE:SEND', newMessage);
        io.to(allSockets[sender]).emit('MESSAGE:SEND', newMessage);
      })
      .catch(() => { io.to(allSockets[sender]).emit('MESSAGE:SEND', {success: true, message: "Не удалось отправить сообщение"}); })
  });

  socket.on("MESSAGE:VIEWED", async (data) => {
    const { messageId, recipient, sender } = data;
    await MessageModel.updateOne({ _id: messageId }, { isChecked: true }).then(() => { 
      io.to(allSockets[recipient]).emit('MESSAGE:VIEWED', { messageId, recipient, sender });
      io.to(allSockets[sender]).emit('MESSAGE:VIEWED', { messageId, recipient, sender });
    });
  });
})

// USERS
app.post("/login", loginValidation, UserController.login);
app.post("/register", registerValidation, UserController.register);
app.post("/users", UserController.getUsersByString);
app.put("/add-friend", UserController.addFriend);
app.get("/get-friends", UserController.getFriends);
app.get("/me", checkAuth, UserController.getMe);

// MESSAGES
// app.post("/create-message", MessageController.create);
app.post("/get-messages", MessageController.getDialogMessages);


server.listen(4444, (error) => {
  if (error) return console.log(`Server error: ${error}`);
  console.log("Server started!");
});