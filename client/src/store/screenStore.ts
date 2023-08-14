import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IScreenState {
  screen: IScreen;
  setScreen: (newScreen: IScreen) => void,
}

export const useScreenStore = create<IScreenState>()(immer((set) => ({
  screen: "chat",
  setScreen: (screen: IScreen) => set(state => {
    state.screen = screen;
  })
})));