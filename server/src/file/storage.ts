import { Request } from "express";
import { diskStorage } from "multer";

const generateId = () => {
  return Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
};

const normalizeFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void
) => {
  const fileExtName = file.originalname.split(".").pop();
  callback(null, `${generateId()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  destination: "./uploads",
  filename: normalizeFileName
});
