import { useUserStore } from "@/src/stores/useUserStore";

export const useIsMyMessage = (senderId: number) => {
  const myId = useUserStore((state) => state.user?.id);
  return senderId === myId;
};
