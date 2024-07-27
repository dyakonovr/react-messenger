import { useSocketContext } from "@/src/components/layout/SocketProvider";
import { useIntersectionObserver } from "@/src/hooks/general/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { useUnreadMessagesContext } from "../../../UnreadMessagesContext";

export const useInViewUnreadMessage = (
  messageId: string,
  isMy: boolean,
  isRead: boolean
) => {
  const { markMessageAsRead } = useUnreadMessagesContext();
  const { isConnected, socket } = useSocketContext();
  const isEnabled = !isMy && !isRead && isConnected && !!socket;
  const messageRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useIntersectionObserver<HTMLDivElement>({
    root: messageRef.current,
    threshold: 0.6,
    enabled: isEnabled
  });

  useEffect(() => {
    if (isEnabled && inView) {
      console.log("@user viewed message (messageId):", messageId);
      markMessageAsRead(messageId);
    }
  }, [inView, isEnabled]);

  return ref;
};
