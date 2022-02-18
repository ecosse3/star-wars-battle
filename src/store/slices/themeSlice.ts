import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IThemeState {
  darkTheme: boolean;
}

// Define the initial state using that type
const initialState: IThemeState = {
  darkTheme: true
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export const selectDarkTheme = (state: RootState) => state.theme.darkTheme;

export default themeSlice.reducer;
