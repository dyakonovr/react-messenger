import axios from "../axios";
import { ServerPaths } from "../enums/ServerPaths";
import { IMessage } from "../interfaces/IMessage";

export const getMessages = async (friendId: string): Promise<IMessage[] | string> => {
  return axios.post(ServerPaths.MESSAGES.GET_MESSAGES, { recipient: friendId })
    .then(response => response.data.allMessages)
    .catch(error => error.response.data.Message);
};