import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

type NewMessageType = {
  name: string;
  message_id: number;
};

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  createMany(files: Express.Multer.File[], messageId: number) {
    const data: NewMessageType[] = files.map((file) => ({
      name: file.filename,
      message_id: messageId
    }));

    return this.prisma.messageFile.createMany({
      data
    });
  }
}
