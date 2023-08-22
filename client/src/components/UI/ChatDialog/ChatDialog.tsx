import { IFriend } from "../../../interfaces/IFriend";
import { useDialogStore } from "../../../store/dialogStore";
import classes from './ChatDialog.module.scss';

interface IChatDialogProps {
  user: IFriend
}

function ChatDialog({ user }: IChatDialogProps) {
  const openDialog = useDialogStore(state => state.openDialog);

  return (
    <li className={classes.dialog} onClick={() => openDialog(user)}>
      <div className="avatar-placeholder">{user.login[0]}</div>
      {/* <img src="https://reqres.in/img/faces/1-image.jpg" alt="Avatar" className="avatar" /> */}
      <div className={classes.dialog_wrapper}>
        <div className={classes.dialog_header}>
          <strong className="name">{user.login}</strong>
          <span className={classes.dialog_last_message_time}>9:36</span>
        </div>
        <div className={classes.dialog_footer}>
          <p className={classes.dialog_last_message}>You: tnx!</p>
          {/* <span className={classes.dialog_new_messages_counter}>3</span> */}
        </div>
      </div>
    </li>
  );
};

export default ChatDialog;