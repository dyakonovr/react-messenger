import { z } from "zod";
import { userSchema } from "./user";
import { messageWithoutIdSchema } from "./chatMessages";

// const lastMessageSchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   createdAt: z.string(),
//   senderId: z.number(),
//   recipientId: z.number(),
//   isRead: z.boolean()
// });

export const dialogSchema = z.object({
  user: userSchema.omit({ id: true }),
  lastMessage: messageWithoutIdSchema.extend({ id: z.number() }),
  newMessagesCount: z.number()
});

export const dialogItemsSchema = z.record(
  z.string(), // userId
  dialogSchema
);

export type IDialog = z.infer<typeof dialogSchema>;
export type IDialogsRecord = z.infer<typeof dialogItemsSchema>;
