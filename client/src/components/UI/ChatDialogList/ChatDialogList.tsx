import axios from "../../../axios";
import { ServerPaths } from "../../../enums/ServerPaths";
import { IFriend } from "../../../interfaces/IFriend";
import { createToast } from "../../../utils/createToast";
import ChatDialog from "../ChatDialog/ChatDialog";
import classes from './ChatDialogList.module.css'
import { useEffect } from 'react';
import { useState } from 'react';

function ChatDialogList() {
  const [dialogsUsers, setDialogsUsers] = useState<IFriend[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      await axios.get(ServerPaths.USERS.GET_FRIENDS)
        .then(response => setDialogsUsers(response.data.friends))
        .catch((error) => createToast(error.response.data.message));
    };

    getFriends();
  }, []);

  return (
    <ul className={classes.dialog_list}>
      {dialogsUsers.map((user, index) => <ChatDialog user={user} key={index} />)}
    </ul>
  );
};

export default ChatDialogList;