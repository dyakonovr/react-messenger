import ChatInput from "../UI/ChatInput/ChatInput";
import ChatWindow from "../UI/ChatWindow/ChatWindow";
import classes from './Chat.module.scss';

function Chat() {
  return (
    // <div className={classes.select_chat}>
    //   <img src={SelectChatSvg} alt="" className={classes.select_chat_img} />
    //   <p className={classes.select_chat_text}>Select a conversation or start a <a href="#">new one</a></p>
    // </div>
    <div className={classes.chat}>
      <div className={classes.chat_header}>
        <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" />
        <div className={classes.chat_title_wrapper}>
          <strong className="name">Pink Panda</strong>
          <span className={classes.chat_user_status}>Online</span>
        </div>
        <button className={classes.chat_button_more}></button>
      </div>
      <ChatWindow />
      <ChatInput />
    </div>
  );
};

export default Chat;