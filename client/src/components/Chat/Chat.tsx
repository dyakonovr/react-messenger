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

function Chat() {
  const addMessageInChat = useChatsStore(state => state.addMessageInChat);
  const currentDialogUser = useDialogStore(state => state.currentDialogUser);
  const openDialog = useDialogStore(state => state.openDialog);
  const dialogIsOpen = !!currentDialogUser?._id;
  const myId = useAuthStore(state => state._id);

  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const runSocket = (myId: string, dialogIsOpen: boolean) => {
      socket.on('MESSAGE:SEND', (data: IMessage) => {
        // console.log(`dialog is open: ${!currentDialogUser?._id}`);
        console.log(`New message:`, data);
        addMessageInChat(myId !== data.sender ? data.sender : data.recipient, data, dialogIsOpen);
      });
    }

    if (myId) runSocket(myId, dialogIsOpen);

    return () => openDialog(null);
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