import jwt from 'jsonwebtoken';

export function getUserIdByToken(token) {
  return jwt.verify(token, "super-secret-key-777")._id;
}