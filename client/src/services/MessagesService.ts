import axios from "../axios";
import { ServerPaths } from "../enums/ServerPaths";

export const getMessages = async (friendId: string) => {
  return axios.post(ServerPaths.MESSAGES.GET_MESSAGES, { recipient: friendId })
    .then(response => response.data.allMessages)
    .catch(error => error.response.data.Message);
}