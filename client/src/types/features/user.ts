import { z } from "zod";

export const userSchema = z.object({
  nickname: z.string(),
  avatar: z.string().nullable(),
  id: z.number()
});

export type IUser = z.infer<typeof userSchema>;

export interface IFriendsPageUser extends IUser {
  isFriend: boolean;
}