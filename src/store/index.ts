import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import theme from './slices/themeSlice';
import game from './slices/gameSlice';

const store = configureStore({
  reducer: {
    theme,
    game,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
