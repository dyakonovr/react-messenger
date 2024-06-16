import { z } from "zod";

export const friendshipResponseSchema = z.object({
  message: z.string()
});

export type IFriendshipResponse = z.infer<typeof friendshipResponseSchema>;
