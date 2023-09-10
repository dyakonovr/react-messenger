import { IFriend } from "../../../interfaces/IFriend";
import { IMessage } from "../../../interfaces/IMessage";
import { useDialogStore } from "../../../store/dialogStore";
import { getNormalTime } from "../../../utils/getNormalTime";
import classes from './ChatDialog.module.scss';

interface IChatDialogProps {
  friend: IFriend,
  lastMessage: IMessage | null,
  newMessagesCounter?: number
}

function ChatDialog({ friend, lastMessage, newMessagesCounter }: IChatDialogProps) {
  const openDialog = useDialogStore(state => state.openDialog);
  const lastMessageText = lastMessage !== null
    ? (lastMessage?.recipient === friend._id ? `You: ${lastMessage.text}` : lastMessage.text) : "";

  return (
    <li className={classes.dialog} onClick={() => openDialog(friend)}>
      <div className="avatar-placeholder">{friend.login[0]}</div>
      {/* <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" /> */}
      <div className={classes.dialog_wrapper}>
        <div className={classes.dialog_header}>
          <strong className="name">{friend.login}</strong>
          <span className={classes.dialog_last_message_time}>{lastMessage ? getNormalTime(lastMessage.createdAt, "dialog") : ""}</span>
        </div>
        <div className={classes.dialog_footer}>
          <p className={classes.dialog_last_message}>{lastMessageText}</p>
          {newMessagesCounter && <span className={classes.dialog_new_messages_counter}>{newMessagesCounter < 10 ? newMessagesCounter : "9+"}</span>}
        </div>
      </div>
    </li>
  );
};

export default ChatDialog;