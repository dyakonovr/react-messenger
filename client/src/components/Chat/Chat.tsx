import { useEffect } from 'react';
import SelectChatIcon from "../../assets/img/select-chat-icon.svg";
import { IMessage } from "../../interfaces/IMessage";
import { getMessages } from "../../services/MessagesService";
import { getFriends } from "../../services/UserService";
import socket from "../../socket";
import { useAuthStore } from "../../store/authStore";
import { useChatsStore } from "../../store/chatsStore";
import { useDialogStore } from "../../store/dialogStore";
import { useFriendsStore } from "../../store/friendsStore";
import { createToast } from "../../utils/createToast";
import ChatInput from "../UI/ChatInput/ChatInput";
import ChatSidebar from "../UI/ChatSidebar/ChatSidebar";
import ChatWindow from "../UI/ChatWindow/ChatWindow";
import classes from './Chat.module.scss';

function Chat() {
  const addMessageInChat = useChatsStore(state => state.addMessageInChat);
  const currentDialogUser = useDialogStore(state => state.currentDialogUser);
  const openDialog = useDialogStore(state => state.openDialog);
  const dialogIsOpen = !!currentDialogUser?._id;
  const myId = useAuthStore(state => state._id);
  const setFriends = useFriendsStore(state => state.setFriends);
  const addChat = useChatsStore(state => state.addChat);
  const checkMessage = useChatsStore(state => state.checkMessage);

  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    function handleKeyboardClick(event: KeyboardEvent) {
      if (event.key === "Escape") openDialog(null);
      else return;
    };

    document.addEventListener('keydown', handleKeyboardClick);
    return () => { document.removeEventListener('keydown', handleKeyboardClick); };
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const runSocketViewMessage = () => {
      socket.off('MESSAGE:VIEWED');

      socket.on('MESSAGE:VIEWED', ({ messageId, recipient, sender }: { messageId: string, recipient: string, sender: string }) => {
        checkMessage(myId === recipient ? sender : recipient, messageId);
      });
    };

    const runSendMessageSocket = (myId: string, dialogIsOpen: boolean) => {
      socket.off('MESSAGE:SEND');

      socket.on('MESSAGE:SEND', (data: IMessage) => {
        addMessageInChat(myId !== data.sender ? data.sender : data.recipient, data, dialogIsOpen, myId === data.sender);
      });
    }

    const getFriendsAndTheirMessages = async () => {
      const friendsResponse = await getFriends();
      if (typeof friendsResponse === "string") {
        createToast(friendsResponse);
        return;
      }

      setFriends(friendsResponse);

      for (let i = 0; i < friendsResponse.length; i++) {
        const friendId = friendsResponse[i]._id;
        const friendsMessages = await getMessages(friendId);

        if (typeof friendsResponse === "string") {
          createToast(friendsResponse);
          break;
        }

        addChat(friendId, friendsMessages as IMessage[]);
      }
    };
    
    if (myId) {
      runSendMessageSocket(myId, dialogIsOpen);
      runSocketViewMessage();
      getFriendsAndTheirMessages();
    }

    return () => openDialog(null);
  }, [myId]);

  return (
    <div className={classes.chat_wrapper}>
      <ChatSidebar />

      {dialogIsOpen
        ?
          <div className={classes.chat}>
            <div className={classes.chat_header}>
              <div className="avatar-placeholder">{currentDialogUser.login[0]}</div>
              {/* <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" /> */}
              <div className={classes.chat_title_wrapper}>
                <strong className="name">{currentDialogUser.login}</strong>
                <span className={classes.chat_user_status}>Online</span>
              </div>
              <button className={classes.chat_button_more}></button>
            </div>
            <ChatWindow recipientUserId={currentDialogUser._id} />
            <ChatInput recipientUserId={currentDialogUser._id} />
          </div>
        :
          <div className={classes.select_chat}>
            <img src={SelectChatIcon} alt="" className={classes.select_chat_img} />
            <p className={classes.select_chat_text}>Select a conversation or start a <a href="#">new one</a></p>
          </div>
       }
    </div>
  );
};

export default Chat;