import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IHomeScreensState {
  screen: IScreen;
  setScreen: (newScreen: IScreen) => void,
}

export const useHomeScreensStore = create<IHomeScreensState>()(immer((set) => ({
  screen: "chat",
  setScreen: (screen: IScreen) => set(state => {
    state.screen = screen;
  })
})));