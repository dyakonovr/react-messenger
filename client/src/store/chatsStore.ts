import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IMessage } from "../interfaces/IMessage";

interface IChat {
  [recipientId: string]: {
    viewed: IMessage[],
    new: IMessage[]
  }
}

interface IChatsState {
  chats: IChat,
  addChat: (recipientId: string, messages: IMessage[]) => void,
  addMessageInChat: (recipientId: string, messages: IMessage, dialogIsOpen: boolean) => void
}

export const useChatsStore = create<IChatsState>()(immer((set) => ({
  chats: {},
  addChat: (recipientId: string, messages: IMessage[]) => set(state => {
    messages.sort((messageA, messageB) => {
      if (messageA.createdAt > messageB.createdAt) return 1;
      if (messageA.createdAt < messageB.createdAt) return -1;
      return 0;
    });
    state.chats[recipientId] = { viewed: messages, new: [] };
  }),
  addMessageInChat: (recipientId: string, messages: IMessage, dialogIsOpen: boolean) => set(state => {
    if (dialogIsOpen) state.chats[recipientId].viewed.push(messages);
    else state.chats[recipientId].new.push(messages);
  }),
})));