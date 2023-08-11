import classes from './Message.module.scss';

interface IMessageProps {
  isMyMessage: boolean
}

function Message({ isMyMessage }: IMessageProps) {
  const messageClasses = [classes.message, isMyMessage ? classes.message_my : classes.message_companion].join(' ');

  return (
    <div className={messageClasses}>
      Hi, How are ya?фыафыафыафафафыа фыафыафафафыафыа asfas f asf as fas fas fas asf asf asfasf asf as faf asf af as fas fas 
      <span className={classes.message_time}>12:00</span>
    </div>
  );
};

export default Message;