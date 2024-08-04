import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Nullable } from "../types/general/nullable";
import { devtools } from "zustand/middleware";
import type { IChatMessages } from "../types/features/chatMessages";

type IChat = {
  [userId: string]: {
    messages: IChatMessages;
    page: number;
    totalPages: number;
  };
};

type State = {
  chats: Nullable<IChat>;
};

type Actions = {
  addNewChat: (
    dialogId: string,
    chatMessages: IChatMessages,
    page: number,
    totalPages: number
  ) => void;
  addMessageInChat: (dialogId: string, message: IChatMessages) => void;
  readMessageInChat: (dialogId: string, messageId: string) => void;
  clearChats: () => void;
};

export const useChatsStore = create<State & Actions>()(
  devtools(
    immer((set) => ({
      chats: null,
      addNewChat: (
        dialogId: string,
        chatMessages: IChatMessages,
        page: number,
        totalPages: number
      ) =>
        set((state) => {
          const chat: IChat = {
            [dialogId]: {
              messages: chatMessages,
              page,
              totalPages
            }
          };

          if (!state.chats) state.chats = chat;
          else {
            state.chats[dialogId] = {
              messages: { ...chatMessages, ...state.chats[dialogId].messages },
              page,
              totalPages
            };
          }
        }),
      addMessageInChat: (dialogId: string, message: IChatMessages) =>
        set((state) => {
          if (state.chats === null || !state.chats[dialogId]) return;
          state.chats[dialogId] = { ...state.chats[dialogId], ...message };
        }),
      readMessageInChat: (dialogId: string, messageId: string) =>
        set((state) => {
          if (
            !state.chats ||
            !state.chats[dialogId] ||
            !state.chats[dialogId].messages[messageId]
          )
            return;
          state.chats[dialogId].messages[messageId].isRead = true;
        }),
      clearChats: () =>
        set((state) => {
          state.chats = null;
        })
    }))
  )
);
