import { useSocketContext } from "@/src/components/layout/SocketProvider";
import { useIntersectionObserver } from "@/src/hooks/general/useIntersectionObserver";
import { useEffect, useRef } from "react";
import MessageSocket from "@/src/sockets/message";
import { useReadMessages } from "../../UnreadMessagesContext";

// const debouncedReadMessages = debounce((socket, messageIds) => {
//   if (messageIds.length > 0) {
//     MessageSocket.readMessages(socket, messageIds); // Предполагаем, что сервер может обработать массив id
//   }
// }, 500);

export const useInViewUnreadMessage = (
  messageId: string,
  isMy: boolean,
  isRead: boolean
) => {
  const { markMessageAsRead } = useReadMessages();
  const { isConnected, socket } = useSocketContext();
  const isEnabled = !isMy && !isRead && isConnected && !!socket;
  const messageRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useIntersectionObserver<HTMLDivElement>({
    root: messageRef.current,
    threshold: 0.6,
    enabled: isEnabled
  });

  // useEffect(() => {
  //   if (isEnabled && inView) {
  //     console.log("@user viewed message (messageId):", messageId);
  //     // MessageSocket.readMessage(socket, messageId);
  //     markMessageAsRead(messageId);
  //   }
  // }, [inView, isEnabled]);

  return ref;
};
