import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";
import { getToken } from "../utils/getToken.js";
import { getUserIdByToken } from "../utils/getUserIdByToken.js";

export const register = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(400).json(errors.array());

    const { email, password, login } = request.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({ email, passwordHash, login });

    const user = await doc.save();
    const { passwordHash: _, ...restUserData } = user._doc;
    const token = jwt.sign({ _id: restUserData._id }, "super-secret-key-777", { expiresIn: "30d" });
    response.json({ success: true, ...restUserData, token });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Не удалось зарегестрироваться" });
  }
};

export const login = async (request, response) => {
  try {
    const { emailOrLogin, password } = request.body;
    const user = await UserModel.findOne(emailOrLogin.includes("@") ? { email: emailOrLogin } : { login: emailOrLogin });
    if (!user) return response.status(404).json({ success: false, message: "Пользователь не найден" });

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) return response.status(404).json({ success: false, message: "Неверный почта/логин или пароль" });

    const { passwordHash: _, ...restUserData } = user._doc;
    const token = jwt.sign({ _id: restUserData._id }, "super-secret-key-777", { expiresIn: "30d" });
    response.json({ success: true, ...restUserData, token });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Не удалось авторизоваться" });
  }
};

export const getMe = async (request, response) => {
  try {
    const user = await UserModel.findById(request.userId);
    if (!user) return response.status(404).json({ success: false, message: "Пользователь не найден" });

    const { passwordHash, ...restUserData } = user._doc;
    response.json({ success: true, ...restUserData });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Нет доступа" });
  }
};

export const getUsersByString = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });

    const _id = getUserIdByToken(token);
    const { searchString } = request.body;
    const users = await UserModel.find(
      {$or: [{ login: { $regex: searchString } }, { email: { $regex: searchString } }] },
      { login: true, email: true, _id: true }
    ).where("_id").ne(_id);
    response.json(users);
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Произошла ошибка получения пользователей по вашему запросу" });
  }
}

export const addFriend = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });
    
    const friendId = request.body.id;
    const myUserId = getUserIdByToken(token);
    await UserModel.updateOne({ _id: myUserId }, { $addToSet: { friends: friendId } });
    await UserModel.updateOne({ _id: friendId }, { $addToSet: { friends: myUserId } });
    response.json({success: true, message: "Пользователь успешно добавлен в друзья"});
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Произошла ошибка добавления пользователя в друзья" });
  }
}

export const getFriends = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });

    const myUserId = getUserIdByToken(token);
    const user = await UserModel.findById(myUserId);
    const friends = await UserModel.find({ _id: { $in: user._doc.friends }}, {_id: true, email: true, login: true});

    response.json({ success: true, friends });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Произошла ошибка. Попробуйте ещё раз" });
  }
}