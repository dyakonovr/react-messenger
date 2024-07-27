import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Nullable } from "../types/general/nullable";
import { devtools } from "zustand/middleware";
import type { IChatMessages } from "../types/features/chatMessages";

type IChat = {
  [userId: string]: IChatMessages;
};

type State = {
  chats: Nullable<IChat>;
  // selectedDialog: Nullable<string>;
};

type Actions = {
  addNewChat: (dialogId: string, chatMessages: IChatMessages) => void;
  addMessageInChat: (dialogId: string, message: IChatMessages) => void;
  readMessageInChat: (dialogId: string, messageId: string) => void;
};

export const useChatsStore = create<State & Actions>()(
  devtools(
    immer((set) => ({
      chats: null,
      addNewChat: (dialogId: string, chatMessages: IChatMessages) =>
        set((state) => {
          if (!state.chats) state.chats = { [dialogId]: chatMessages };
          else state.chats[dialogId] = { ...chatMessages, ...state.chats[dialogId] };
        }),
      addMessageInChat: (dialogId: string, message: IChatMessages) =>
        set((state) => {
          if (state.chats === null || !state.chats[dialogId]) return;
          state.chats[dialogId] = { ...state.chats[dialogId], ...message };
        }),
      readMessageInChat: (dialogId: string, messageId: string) =>
        set((state) => {
          if (!state.chats || !state.chats[dialogId] || !state.chats[dialogId][messageId])
            return;
          state.chats[dialogId][messageId].isRead = true;
        })
    }))
  )
);
