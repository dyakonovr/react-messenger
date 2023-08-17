import MessageModel from "../models/Message.js";
import UserModel from "../models/User.js";
import { getToken } from "../utils/getToken.js";
import { getUserIdByToken } from "../utils/getUserIdByToken.js";

export const create = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });
    
    const myUserId = getUserIdByToken(token);
    const myUser = await UserModel.findById(myUserId);
    const sender = myUser._id;
    const { text, recipient } = request.body;
    const doc = new MessageModel({ text, sender, recipient });
    const message = await doc.save();
    response.json({ success: true, message });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Не удалось отправить сообщение" });
  }
};

export const getDialogMessages = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });

    const myUserId = getUserIdByToken(token);
    const { recipient } = request.body;
    const allMessages = await MessageModel.find({ $or: [{ $and: [{ sender: myUserId }, { recipient }] }, { $and: [{ sender: recipient }, { recipient: myUserId }] }] });
    response.json({ success: true, allMessages });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Не удалось получить сообщения" });
  }
}