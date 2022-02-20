import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { peopleApi } from './api/peopleApi';
import { starshipsApi } from './api/starshipsApi';
import theme from './slices/themeSlice';
import game from './slices/gameSlice';
import people from './slices/peopleSlice';

const store = configureStore({
  reducer: {
    theme,
    game,
    people,
    [peopleApi.reducerPath]: peopleApi.reducer,
    [starshipsApi.reducerPath]: starshipsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware, starshipsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
