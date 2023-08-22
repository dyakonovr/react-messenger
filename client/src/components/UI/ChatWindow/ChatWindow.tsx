import { useEffect } from 'react';
import axios from "../../../axios";
import { ServerPaths } from "../../../enums/ServerPaths";
import { useChatsStore } from "../../../store/chatsStore";
import { createToast } from "../../../utils/createToast";
import Message from "../Message/Message";
import { IMessage } from './../../../interfaces/IMessage';
import classes from './ChatWindow.module.scss';
import { useRef } from 'react';

interface IChatWindowProps {
  recipientUserId: string
}

function ChatWindow({ recipientUserId }: IChatWindowProps) {
  const addChat = useChatsStore(state => state.addChat);
  const currentMessages = useChatsStore(state => state.chats[recipientUserId]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (wrapperRef.current) wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight || 1000);
    }, 70);
  });

  useEffect(() => {
    const getAllMessages = async () => await axios.post(ServerPaths.MESSAGES.GET_MESSAGES, { recipient: recipientUserId })
      .then((response) => {
        const allMessages: IMessage[] = response.data.allMessages;
        addChat(recipientUserId, allMessages);
      })
      .catch(error => createToast(error.response.data.error));
    
    // Если сообщения уже лежат в сторе, не нужно их обновлять
    if (!currentMessages) getAllMessages();
  }, [recipientUserId]);

  return (
    <div className={classes.chat_window} ref={wrapperRef}>
      {currentMessages && currentMessages.length !== 0 &&
          currentMessages?.map((messageObj) =>
            <Message obj={messageObj} isMyMessage={recipientUserId !== messageObj.sender} key={messageObj.createdAt} />)
      }
    </div>
  );
};

export default ChatWindow;