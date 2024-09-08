// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'green',  // Default to 'light' if no theme is stored
  header:localStorage.getItem('headerType')||'fixed',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    setHeader: (state, action) => {
      state.header = action.payload;
      console.log("neww",state.header)
      localStorage.setItem('headerType', state.header);
    },
  },
});

export const { setTheme,setHeader } = themeSlice.actions;
export default themeSlice.reducer;
