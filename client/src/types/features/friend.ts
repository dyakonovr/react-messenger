import { z } from "zod";
import { userSchema } from "./user";
import { FriendshipStatuses } from "@/src/enums/FriendshipStatuses";

export const friendsPageUserSchema = userSchema.extend({
  friendshipStatus: z.nativeEnum(FriendshipStatuses).optional()
});

export type IFriendsPageUser = z.infer<typeof friendsPageUserSchema>;
