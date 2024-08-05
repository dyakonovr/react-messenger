export type FriendsPageUsersType = "friends" | "all" | "sent" | "received";

export const friendsPageUsersTypesArray: FriendsPageUsersType[] = [
  "all",
  "friends",
  "received",
  "sent"
] as const;
