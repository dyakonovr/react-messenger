import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IAuthState {
  email: null | string,
  token: null | string,
  login: null | string,
  isAuth: Boolean,
  setUser: (email: string, login: string, token: string) => void,
}

export const useAuthStore = create<IAuthState>()(immer((set) => ({
  email: null,
  token: null,
  login: null,
  isAuth: false,
  setUser: (email: string, login: string, token: string) => set(state => {
    state.email = email;
    state.login = login;
    state.token = token;
    state.isAuth = true;
  })
})));