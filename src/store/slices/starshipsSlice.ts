import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IStarshipsState {
  leftPlayerScore: number;
  rightPlayerScore: number;
}

// Define the initial state using that type
const initialState: IStarshipsState = {
  leftPlayerScore: 0,
  rightPlayerScore: 0
};

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    givePointToLeftPlayer: (state) => {
      state.leftPlayerScore += 1;
    },
    givePointToRightPlayer: (state) => {
      state.rightPlayerScore += 1;
    }
  }
});

export const { givePointToLeftPlayer, givePointToRightPlayer } = starshipsSlice.actions;

export const selectLeftPlayerScore = (state: RootState) =>
  state.starships.leftPlayerScore;
export const selectRightPlayerScore = (state: RootState) =>
  state.starships.rightPlayerScore;

export default starshipsSlice.reducer;
