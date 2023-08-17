import { IMessage } from "../../../interfaces/IMessage";
import { getNormalTime } from "../../../utils/getNormalTime";
import classes from './Message.module.scss';

interface IMessageProps {
  obj: IMessage,
  isMyMessage: boolean
}

function Message({ obj, isMyMessage }: IMessageProps) {
  const messageClasses = [classes.message, isMyMessage ? classes.message_my : classes.message_companion].join(' ');

  return (
    <div className={messageClasses}>
      {obj.text} 
      <span className={classes.message_time}>{getNormalTime(obj.createdAt)}</span>
    </div>
  );
};

export default Message;