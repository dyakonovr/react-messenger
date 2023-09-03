import { useEffect, useRef } from 'react';
import { useChatsStore } from "../../../store/chatsStore";
import Message from "../Message/Message";
import classes from './ChatWindow.module.scss';
import { sortMessages } from "../../../utils/sortMessages";

interface IChatWindowProps {
  recipientUserId: string
}

function ChatWindow({ recipientUserId }: IChatWindowProps) {
  const currentMessages = useChatsStore(state => state.chats[recipientUserId]);
  // console.log(currentMessages);
  const sortedMessages = sortMessages([...currentMessages]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (wrapperRef.current) wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight || 1000);
    }, 70);
  });

  return (
    <div className={classes.chat_window} ref={wrapperRef}>
      {sortedMessages && sortedMessages.length !== 0 &&
          sortedMessages.map((messageObj) =>
            <Message obj={messageObj} isMyMessage={recipientUserId !== messageObj.sender} key={messageObj.createdAt} />)
      }
    </div>
  );
};

export default ChatWindow;