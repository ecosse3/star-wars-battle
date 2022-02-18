import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IThemeState {
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: IThemeState = {
  darkMode: true
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
