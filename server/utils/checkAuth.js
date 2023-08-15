import jwt from "jsonwebtoken";
import { getToken } from "./getToken.js";

export function checkAuth(request, response, next) {
  const token = getToken(request);
  if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });

  try {
    const decoded = jwt.verify(token, "super-secret-key-777");
    request.userId = decoded._id;
    next();
  } catch (error) {
    return response.status(403).json({ success: false, message: "Нет доступа" });
  }
};