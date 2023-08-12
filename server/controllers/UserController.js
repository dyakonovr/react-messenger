import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

export const register = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(400).json(errors.array());

    const { email, password, login, avatarUrl } = request.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({ email, passwordHash, login, avatarUrl });

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
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });
    if (!user) return response.status(404).json({ success: false, message: "Пользователь не найден" });

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) return response.status(404).json({ success: false, message: "Неверный логин или пароль" });

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