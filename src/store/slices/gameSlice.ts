import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IGameState {
  resource: 'people' | 'starships' | null;
}

// Define the initial state using that type
const initialState: IGameState = {
  resource: null
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setResource: (state, action) => {
      state.resource = action.payload;
    }
  }
});

export const { setResource } = gameSlice.actions;

export const selectResource = (state: RootState) => state.game.resource;

export default gameSlice.reducer;
