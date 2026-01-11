/*
   Zustand store handles the "Source of Truth" for the messages and active chats. 
   When the socket receives a message, it updates this store, and any component listening (e.g Inbox or Chat Room) will automatically re-render.
 
   This listener along with it's companion utils/socket.ts should be initialized in the top-level component (e.g app/_layout.tsx).
   This acts as the "bridge" between the server and the global state.

*/

import { create } from "zustand";

interface Message {
  id: string;
  senderId: string;
  chatId: string;
  text: string;
  timestamp: Date;
}

interface ChatState {
  messages: Record<string, Message[]>; // Keyed by chatId for quick access
  addMessage: (chatId: string, message: Message) => void;
  setInitialMessages: (chatId: string, messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},

  // Append a single new message to the correct chat
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),

  // Initialize a chat history (fetched from MongoDB 8.1)
  setInitialMessages: (chatId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: messages,
      },
    })),
}));