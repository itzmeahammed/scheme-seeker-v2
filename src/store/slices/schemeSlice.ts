import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scheme } from '../../types';

interface SchemeState {
  schemes: Scheme[];
  savedSchemes: string[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    difficulty: string;
    minRating: number;
  };
}

const initialState: SchemeState = {
  schemes: [],
  savedSchemes: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    difficulty: 'all',
    minRating: 0,
  },
};

const schemeSlice = createSlice({
  name: 'scheme',
  initialState,
  reducers: {
    setSchemes: (state, action: PayloadAction<Scheme[]>) => {
      state.schemes = action.payload;
    },
    saveScheme: (state, action: PayloadAction<string>) => {
      if (!state.savedSchemes.includes(action.payload)) {
        state.savedSchemes.push(action.payload);
        localStorage.setItem('savedSchemes', JSON.stringify(state.savedSchemes));
      }
    },
    unsaveScheme: (state, action: PayloadAction<string>) => {
      state.savedSchemes = state.savedSchemes.filter(id => id !== action.payload);
      localStorage.setItem('savedSchemes', JSON.stringify(state.savedSchemes));
    },
    loadSavedSchemes: (state) => {
      const saved = localStorage.getItem('savedSchemes');
      if (saved) {
        state.savedSchemes = JSON.parse(saved);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<SchemeState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setSchemes,
  saveScheme,
  unsaveScheme,
  loadSavedSchemes,
  setFilters,
} = schemeSlice.actions;

export default schemeSlice.reducer;