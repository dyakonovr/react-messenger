import { useUserStore } from "@/src/stores/useUserStore";

export const useIsMyMessage = (senderId: number | undefined) => {
  const myId = useUserStore((state) => state.user?.id);
  return !!(senderId && myId && senderId === myId);
};
