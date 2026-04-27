import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('shoptiq_theme') || 'light',
  isSidebarOpen: true,
  isLoading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('shoptiq_theme', state.theme);
    },
    setSidebarStatus: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({ id: Date.now(), ...action.payload });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { toggleTheme, setSidebarStatus, setGlobalLoading, addNotification, clearNotifications } = uiSlice.actions;
export default uiSlice.reducer;
