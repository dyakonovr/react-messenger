import { useEffect } from 'react';
import SelectChatIcon from "../../assets/img/select-chat-icon.svg";
import { IMessage } from "../../interfaces/IMessage";
import socket from "../../socket";
import { useAuthStore } from "../../store/authStore";
import { useChatsStore } from "../../store/chatsStore";
import { useDialogStore } from "../../store/dialogStore";
import ChatInput from "../UI/ChatInput/ChatInput";
import ChatSidebar from "../UI/ChatSidebar/ChatSidebar";
import ChatWindow from "../UI/ChatWindow/ChatWindow";
import classes from './Chat.module.scss';
import axios from "../../axios";
import { ServerPaths } from "../../enums/ServerPaths";
import { useFriendsStore } from "../../store/friendsStore";
import { createToast } from "../../utils/createToast";
import { IFriend } from "../../interfaces/IFriend";

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
    const runSocket = (myId: string, dialogIsOpen: boolean) => {
      socket.on('MESSAGE:SEND', (data: IMessage) => {
        console.log(`New message:`, data);
        addMessageInChat(myId !== data.sender ? data.sender : data.recipient, data, dialogIsOpen, myId === data.sender);
      });
    }

    if (myId) runSocket(myId, dialogIsOpen);

    return () => openDialog(null);
  }, [myId]);

  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const runSocketViewMessage = () => {
      socket.on('MESSAGE:VIEWED', ({ messageId, recipient, sender }: { messageId: string, recipient: string, sender: string }) => {
        console.log(myId, messageId);
        checkMessage(myId === recipient ? sender : recipient, messageId);
      });
    };

    if (myId) runSocketViewMessage();
  }, [myId]);

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
    new Promise<IFriend[]>((resolve) => {
      axios.get(ServerPaths.USERS.GET_FRIENDS)
        .then(response => {
          setFriends(response.data.friends);
          resolve(response.data.friends);
        })
        .catch((error) => createToast(error.response.data.message));
    }).then((friends) => {
      for (let i = 0; i < friends.length; i++) {
        const friendId = friends[i]._id;
        
        axios.post(ServerPaths.MESSAGES.GET_MESSAGES, { recipient: friendId })
          .then((response) => {
            const allMessages: IMessage[] = response.data.allMessages;
            addChat(friendId, allMessages);
          })
          .catch(error => console.log(error));
      }
    })
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