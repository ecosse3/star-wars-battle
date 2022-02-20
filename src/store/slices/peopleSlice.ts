import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IPeopleState {
  leftPlayerScore: number;
  rightPlayerScore: number;
}

// Define the initial state using that type
const initialState: IPeopleState = {
  leftPlayerScore: 0,
  rightPlayerScore: 0
};

export const peopleSlice = createSlice({
  name: 'people',
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

export const { givePointToLeftPlayer, givePointToRightPlayer } = peopleSlice.actions;

export const selectLeftPlayerScore = (state: RootState) => state.people.leftPlayerScore;
export const selectRightPlayerScore = (state: RootState) => state.people.rightPlayerScore;

export default peopleSlice.reducer;
