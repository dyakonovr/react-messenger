import { IFriend } from "../../../interfaces/IFriend";
import { IMessage } from "../../../interfaces/IMessage";
import { useChatsStore } from "../../../store/chatsStore";
import ChatDialog from "../ChatDialog/ChatDialog";
import classes from './ChatDialogList.module.css';

interface IChatDialogListProps {
  friends: IFriend[]
}

function ChatDialogList({friends}: IChatDialogListProps) {
  const allFriendsMessages = useChatsStore(state => state.chats);

  // Функции
  function createDialogs() {
    if (friends.length === 0) return (<div className={classes.empty}>Nobody's here...</div>);

    return friends.map((friend, index) => {
      const friendMessages = allFriendsMessages[friend._id];
      if (!friendMessages) return;

      const newMessages: IMessage[] = [];
      const viewedMessages: IMessage[] = [];

      for (let i = 0; i < friendMessages.length; i++) {
        const message = friendMessages[i];
        if (message.isChecked === false && message.sender === friend._id) newMessages.push(message);
        else viewedMessages.push(message);
      }

      if (friendMessages?.length === 0) return <ChatDialog friend={friend} key={index} lastMessage={null} />
      if (newMessages?.length === 0) return <ChatDialog friend={friend} key={index} lastMessage={viewedMessages[viewedMessages.length - 1]} /> 
      else return <ChatDialog friend={friend} key={index} lastMessage={newMessages[newMessages.length - 1]} newMessagesCounter={newMessages.length} />
    })
  }
  // Функции END

  return (
    <ul className={classes.dialog_list}>
      {createDialogs()}
    </ul>
  );
};

export default ChatDialogList;