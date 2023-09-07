import { useEffect, useRef } from 'react';
import { useChatsStore } from "../../../store/chatsStore";
import Message from "../Message/Message";
import classes from './ChatWindow.module.scss';
import { sortMessages } from "../../../utils/sortMessages";
import { getNormalTime } from "../../../utils/getNormalTime";

interface IDataMessageProps {
  currentMessageDate: string,
}

function DataMessage({currentMessageDate}: IDataMessageProps) {
  return (
    <div className={classes.date}><span>{currentMessageDate}</span></div>
  );
}

interface IChatWindowProps {
  recipientUserId: string
}

function ChatWindow({ recipientUserId }: IChatWindowProps) {
  const currentMessages = useChatsStore(state => state.chats[recipientUserId]);
  const sortedMessages = sortMessages([...currentMessages]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (wrapperRef.current) wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight || 1000);
    }, 70);
  });

  // Функции
  function getChatMessages() {
    if (!sortedMessages || sortedMessages.length === 0) return;
      
    const chatHistory = [];
    chatHistory.push(<DataMessage currentMessageDate={getNormalTime(sortedMessages[0].createdAt, "date")} key={-1} />);
    let date = getNormalTime(sortedMessages[0].createdAt, "date");

    for (let i = 0; i < sortedMessages.length; i++) {
      const currentMessage = sortedMessages[i];
      const currentMessageDate = getNormalTime(currentMessage.createdAt, "date");

      if (date !== currentMessageDate) {
        chatHistory.push(<DataMessage currentMessageDate={currentMessageDate} key={i} />);
        date = currentMessageDate;
      }

      chatHistory.push(<Message obj={currentMessage} isMyMessage={recipientUserId !== currentMessage.sender} key={currentMessage.createdAt} />);
    }

    return chatHistory;
  }
  // Функции END

  return (
    <div className={classes.chat_window} ref={wrapperRef}>
      {getChatMessages()}
    </div>
  );
};

export default ChatWindow;