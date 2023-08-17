import { useEffect } from 'react';
import axios from "../../../axios";
import { ServerPaths } from "../../../enums/ServerPaths";
import { useChatsStore } from "../../../store/chatsStore";
import { createToast } from "../../../utils/createToast";
import Message from "../Message/Message";
import { IMessage } from './../../../interfaces/IMessage';
import classes from './ChatWindow.module.scss';

interface IChatWindowProps {
  recipientUserId: string
}

function ChatWindow({ recipientUserId }: IChatWindowProps) {
  const addChat = useChatsStore(state => state.addChat);
  const currentMessages = useChatsStore(state => state.chats[recipientUserId]);

  useEffect(() => {
    const getAllMessages = async () => await axios.post(ServerPaths.MESSAGES.GET_MESSAGES, { recipient: recipientUserId })
      .then((response) => {
        const { allMessages }: { allMessages: IMessage[] } = response.data;
        console.log(allMessages);
        addChat(recipientUserId, allMessages);
      })
      .catch(error => createToast(error.response.data.error));
    
    getAllMessages();
  }, [recipientUserId]);

  return (
    <div className={classes.chat_window}>
      {currentMessages && currentMessages.length !== 0 &&
          currentMessages?.map(messageObj =>
            <Message obj={messageObj} isMyMessage={recipientUserId !== messageObj.sender} key={messageObj.createdAt} />)
      }
    </div>
  );
};

export default ChatWindow;