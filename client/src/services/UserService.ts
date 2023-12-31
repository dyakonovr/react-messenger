import axios from '../axios';
import { ServerPaths } from "../enums/ServerPaths";
import { IFriend } from "../interfaces/IFriend";

export const getFriends = async (): Promise<IFriend[] | string> => {
  return axios.get(ServerPaths.USERS.GET_FRIENDS)
    .then(response => response.data.friends)
    .catch(error => error.response.data.message);
}

export const authorization = async (emailOrLogin: string, password: string): Promise<IAuthResponse | string> => {
  return axios.post(ServerPaths.USERS.LOGIN, { emailOrLogin, password })
    .then(response => response.data)
    .catch(error => error.response.data.message);
}

export const register = async (email: string, password: string, login: string): Promise<IAuthResponse | string> => {
  return axios.post(ServerPaths.USERS.REGISTER, { email, password, login })
    .then(response => response.data)
    .catch(error => error.response.data.message);
}

export const addFriend = async (id: string): Promise<string> => {
  return axios.put(ServerPaths.USERS.ADD_FRIEND, { id })
      .then(response => response.data.message)
      .catch(error => error.response.data.message)
}

export const getUsers = async (value: string): Promise<IFriend[] | string> => {
  return axios.post(ServerPaths.USERS.GET_USERS, { searchString: value })
    .then(response => response.data)
    .catch(error => error.response.data.message);
}

export const getMe = async (): Promise<IAuthResponse | string> => {
  return axios.get(ServerPaths.USERS.GET_ME)
    .then(response => response.data)
    .catch(error => error.response.data.message)
}