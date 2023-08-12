import jwt from "jsonwebtoken";

export function checkAuth(request, response, next) {
  const token = (request.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!token) return response.status(403).json({ success: false, message: "Нет доступа" });

  try {
    const decoded = jwt.verify(token, "super-secret-key-777");
    request.userId = decoded._id;
    next();
  } catch (error) {
    return response.status(403).json({ success: false, message: "Нет доступа" });
  }
};