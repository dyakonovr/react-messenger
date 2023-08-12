import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть длинной минимум 6 символов").isLength({ min: 6 }),
  body("login", "Укажите логин").isLength({ min: 3 }),
];