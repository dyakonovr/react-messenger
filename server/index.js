import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { checkAuth } from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import { registerValidation } from "./validators/register.js";
import { loginValidation } from "./validators/login.js";

mongoose.connect("mongodb+srv://admin:wwwwww@cluster1.xialhyu.mongodb.net/messenger?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  }).catch((error) => {
    console.log(`DB error: ${error}`);
  });

const app = express();
app.use(express.json());
app.use(cors());
  
app.post("/login", loginValidation, UserController.login);
app.post("/register", registerValidation, UserController.register);
app.post("/users", UserController.getUsersByString);
app.post("/add-friend", UserController.addFriend);
app.get("/get-friends", UserController.getFriends);
app.get("/me", checkAuth, UserController.getMe);

app.listen(4444, (error) => {
  if (error) return console.log(`Server error: ${error}`);
  console.log("Server started!");
});