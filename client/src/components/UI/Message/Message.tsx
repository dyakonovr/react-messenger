import { IMessage } from "../../../interfaces/IMessage";
import socket from "../../../socket";
import { getNormalTime } from "../../../utils/getNormalTime";
import classes from './Message.module.scss';
import { useEffect } from 'react';
import { useRef } from 'react';

interface IMessageProps {
  obj: IMessage,
  isMyMessage: boolean
}

function Message({ obj, isMyMessage }: IMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const messageClasses = [classes.message, isMyMessage ? classes.message_my : classes.message_companion].join(' ');

  // useEffect(() => {
  //   if (!messageRef.current || obj.isChecked) return;

  //   let observers: IntersectionObserver;

  //   observers = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.intersectionRatio === 1) {
  //           socket.emit("MESSAGE:VIEWED", {messageId: obj._id, recipientId: isMyMessage ? obj.recipient : obj.sender});
  //           observers.disconnect();
  //         }
  //       })
  //     },
  //     {root: null, rootMargin: "0px", threshold: [0, 0.25, 0.5, 0.75, 1.0]},
  //   );

  //   observers.observe(messageRef.current);
  // }, []);

  return (
    <div className={messageClasses} ref={messageRef}>
      {obj.text} 
      <span className={classes.message_time}>{getNormalTime(obj.createdAt)}</span>
    </div>
  );
};

export default Message;