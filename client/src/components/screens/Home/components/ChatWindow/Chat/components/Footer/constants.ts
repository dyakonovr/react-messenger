import { z } from "zod";

export const sendMessageFormSchema = z.object({
  text: z.string()
});

export type SendMessageFormSchemaType = z.infer<typeof sendMessageFormSchema>;
