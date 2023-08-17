import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IMessage } from "../interfaces/IMessage";

interface IChatsState {
  chats: { [recipientId: string]: IMessage[] },
  addChat: (recipientId: string, messages: IMessage[]) => void,
  addMessageInChat: (recipientId: string, messages: IMessage) => void
}

export const useChatsStore = create<IChatsState>()(immer((set) => ({
  chats: {},
  addChat: (recipientId: string, messages: IMessage[]) => set(state => {
    messages.sort((messageA, messageB) => {
      if (messageA.createdAt > messageB.createdAt) return 1;
      if (messageA.createdAt < messageB.createdAt) return -1;
      return 0;
    });
    state.chats[recipientId] = messages;
  }),
  addMessageInChat: (recipientId: string, messages: IMessage) => set(state => {
    state.chats[recipientId].push(messages);
  }),
})));