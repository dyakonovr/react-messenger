import { z } from "zod";

export const messageWithoutIdSchema = z.object({
  text: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isRead: z.boolean(),
  senderId: z.number(),
  recipientId: z.number()
});

export const chatMessagesSchema = z.record(
  z.string(), // messageId
  messageWithoutIdSchema
);

export type IMessageWithoutId = z.infer<typeof messageWithoutIdSchema>;
export type IChatMessages = z.infer<typeof chatMessagesSchema>;
