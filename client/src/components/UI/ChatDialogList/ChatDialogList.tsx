import { IMessage } from "../../../interfaces/IMessage";
import { useChatsStore } from "../../../store/chatsStore";
import { useFriendsStore } from "../../../store/friendsStore";
import ChatDialog from "../ChatDialog/ChatDialog";
import classes from './ChatDialogList.module.css';

function ChatDialogList() {
  const friends = useFriendsStore(state => state.friends);
  const allFriendsMessages = useChatsStore(state => state.chats);

  return (
    <ul className={classes.dialog_list}>
      {friends.map((user, index) => {
        const friendMessages = allFriendsMessages[user._id];
        if (!friendMessages) return;

        const viewedMessages = friendMessages.filter((message: IMessage) => message.isChecked === true);
        const newMessages = friendMessages.filter((message: IMessage) => message.isChecked === false);

        if (friendMessages?.length === 0) return <ChatDialog friend={user} key={index} lastMessage={null} />
        if (newMessages?.length === 0) return <ChatDialog friend={user} key={index} lastMessage={viewedMessages[viewedMessages.length - 1]} /> 
        else return <ChatDialog friend={user} key={index} lastMessage={newMessages[newMessages.length - 1]} newMessagesCounter={newMessages.length} />
      })}
    </ul>
  );
};

export default ChatDialogList;