import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IAuthState {
  _id: null | string,
  email: null | string,
  token: null | string,
  login: null | string,
  isAuth: Boolean,
  setUser: (email: string, login: string, token: string, _id: string) => void,
}

export const useAuthStore = create<IAuthState>()(immer((set) => ({
  _id: null,
  email: null,
  token: null,
  login: null,
  isAuth: false,
  setUser: (email: string, login: string, token: string, _id: string) => set(state => {
    state._id = _id;
    state.email = email;
    state.login = login;
    state.token = token;
    state.isAuth = true;
  })
})));