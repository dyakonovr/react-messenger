import ChatInput from "../UI/ChatInput/ChatInput";
import ChatSidebar from "../UI/ChatSidebar/ChatSidebar";
import ChatWindow from "../UI/ChatWindow/ChatWindow";
import classes from './Chat.module.scss';
import SelectChatIcon from "../../assets/img/select-chat-icon.svg";
import { useDialogStore } from "../../store/dialogStore";
import { useEffect } from 'react';

function Chat() {
  const currentDialogUser = useDialogStore(state => state.currentDialogUser);
  const openDialog = useDialogStore(state => state.openDialog);
  const dialogIsOpen = !!currentDialogUser?._id;

  useEffect(() => {
    return () => openDialog(null);
  }, []);

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