import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IMessage } from './../interfaces/IMessage';

// interface IChat {
//   [recipientId: string]: {
//     viewed: IMessage[],
//     new: IMessage[]
//   }
// }

interface IChat {
  [recipientId: string]: IMessage[]
}

interface IChatsState {
  chats: IChat,
  addChat: (recipientId: string, messages: IMessage[]) => void,
  addMessageInChat: (recipientId: string, messages: IMessage, dialogIsOpen: boolean, isMyMessage: boolean) => void,
  checkMessage: (recipientId: string, messageId: string) => void
}

export const useChatsStore = create<IChatsState>()(immer((set) => ({
  chats: {},
  addChat: (recipientId: string, messages: IMessage[]) => set(state => {
    // const newMessages = messages.filter((message: IMessage) => message.isChecked === false);
    // const viewedMessages = messages.filter((message: IMessage) => message.isChecked === true);
    // state.chats[recipientId] = { viewed: viewedMessages, new: newMessages };
    state.chats[recipientId] = messages;

  }),
  addMessageInChat: (recipientId: string, message: IMessage, dialogIsOpen: boolean, isMyMessage: boolean) => set(state => {
    // if (dialogIsOpen || isMyMessage) state.chats[recipientId].viewed.push(messages);
    // else state.chats[recipientId].new.push(messages);
    state.chats[recipientId].push(message);
  }),
  checkMessage: (recipientId: string, messageId: string) => set(state => {
    // state.chats[recipientId].map((message: IMessage) => {
    //   if (message._id === messageId) message.isChecked = true;
    // });

    if (!state.chats[recipientId]) return;

    state.chats[recipientId] = state.chats[recipientId].map(message => { 
      if (message._id === messageId) message.isChecked = true;
      return message;
    });

    // for (let i = state.chats[recipientId].length; i >= 0; i--) {
      
    //   const message = state.chats[recipientId][i];
    //   console.log(state.chats[recipientId], message);
      
    // }
    // state.chats[recipientId].new.
  })
})));