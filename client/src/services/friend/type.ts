export type FriendsPageUsersType = "friends" | "all" | "sent" | "received";

export const typesArray: FriendsPageUsersType[] = [
  "all",
  "friends",
  "received",
  "sent"
] as const;
