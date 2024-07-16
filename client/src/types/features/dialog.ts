import { z } from "zod";
import { messageWithoutIdSchema } from "./chatMessages";

const dialogInfoSchema = z.object({
  name: z.string(),
  avatar: z.string().nullable()
});

export const dialogSchema = z.object({
  info: dialogInfoSchema,
  lastMessage: messageWithoutIdSchema.extend({ id: z.number() }).nullable(),
  newMessagesCount: z.number()
});

export const dialogItemsSchema = z.record(
  z.string(), // chatId
  dialogSchema
);

export type IDialog = z.infer<typeof dialogSchema>;
export type IDialogInfo = z.infer<typeof dialogInfoSchema>;
export type IDialogsRecord = z.infer<typeof dialogItemsSchema>;
