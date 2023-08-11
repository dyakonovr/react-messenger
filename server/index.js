import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:wwwwww@cluster1.xialhyu.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("DB is ok");
  }).catch((error) => {
    console.log(`DB error: ${error}`);
  });

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello world!");
});
  
app.post("/login", (request, response) => {
  const { email, password } = request.body;

  const token = jwt.sign({ email, password }, "super-secret-key-777");

  response.json({
    success: true,
    token
  });
});

app.listen(4444, (error) => {
  if (error) return console.log(`Server error: ${error}`);

  console.log("Server started!");
});