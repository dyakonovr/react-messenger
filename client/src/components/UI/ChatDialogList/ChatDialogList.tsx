import { IMessage } from "../../../interfaces/IMessage";
import { useChatsStore } from "../../../store/chatsStore";
import { useFriendsStore } from "../../../store/friendsStore";
import ChatDialog from "../ChatDialog/ChatDialog";
import classes from './ChatDialogList.module.css';

function ChatDialogList() {
  const friends = useFriendsStore(state => state.friends);
  const allFriendsMessages = useChatsStore(state => state.chats);

  // Функции
  function createDialogs() {
    if (!friends) return;

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