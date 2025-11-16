import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  language: 'en' | 'hi' | 'te';
  sidebarOpen: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
}

const initialState: UIState = {
  darkMode: true,
  language: 'en',
  sidebarOpen: true,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    setLanguage: (state, action: PayloadAction<'en' | 'hi' | 'te'>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    loadUIPreferences: (state) => {
      const darkMode = localStorage.getItem('darkMode');
      const language = localStorage.getItem('language') as 'en' | 'hi' | 'te';
      
      if (darkMode) {
        state.darkMode = JSON.parse(darkMode);
      }
      if (language) {
        state.language = language;
      }
    },
  },
});

export const {
  toggleDarkMode,
  setLanguage,
  toggleSidebar,
  addNotification,
  removeNotification,
  loadUIPreferences,
} = uiSlice.actions;

export default uiSlice.reducer;