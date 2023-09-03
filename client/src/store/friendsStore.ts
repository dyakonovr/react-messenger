import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IFriend } from "../interfaces/IFriend";

interface IFriendsState {
  friends: IFriend[],
  setFriends: (friends: IFriend[]) => void,
}

export const useFriendsStore = create<IFriendsState>()(immer((set) => ({
  friends: [],
  setFriends: (friends: IFriend[]) => set(state => {
    state.friends = friends;
  })
})));