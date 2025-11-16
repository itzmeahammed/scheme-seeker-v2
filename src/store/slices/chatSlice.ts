import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '../../types';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  currentConversationId: string | null;
}

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  currentConversationId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem('chatMessages');
    },
    loadMessagesFromStorage: (state) => {
      const storedMessages = localStorage.getItem('chatMessages');
      if (storedMessages) {
        state.messages = JSON.parse(storedMessages);
      }
    },
    startNewConversation: (state, action: PayloadAction<string>) => {
      state.currentConversationId = action.payload;
      state.messages = [];
    },
  },
});

export const {
  addMessage,
  setTyping,
  clearMessages,
  loadMessagesFromStorage,
  startNewConversation,
} = chatSlice.actions;

export default chatSlice.reducer;