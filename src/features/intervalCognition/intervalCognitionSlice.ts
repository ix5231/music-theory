import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootSelector } from 'app/selector';

export type KeyNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface IntervalCognitionState {
  selectedInterval: { from?: KeyNumber, to?: KeyNumber };
}

export const initialState: IntervalCognitionState = {
  selectedInterval: { from: undefined, to: undefined },
};

export const stateSelector = createSelector(
  rootSelector,
  (state) => state.intervalCognition,
);

export const selectedIntervalSelector = createSelector(
  stateSelector,
  (state) => state.selectedInterval,
);

const intervalTable = [
  'Perfect Unison',
  'minor 2nd',
  'Major 2nd',
  'minor 3rd',
  'Major 3rd',
  'Perfect 4th',
  'Tritone',
  'Perfect 5th',
  'minor 6th',
  'Major 6th',
  'minor 7th',
  'Major 7th',
];

export const intervalSelector = createSelector(
  selectedIntervalSelector,
  (state): string | undefined => {
    if (state.from === undefined || state.to === undefined) {
      return undefined;
    }

    const intervalNum = state.to - state.from;
    let direction;
    if (intervalNum > 0) {
      direction = 'Ascendant ';
    } else if (intervalNum < 0) {
      direction = 'Descendant ';
    } else {
      direction = '';
    }

    const idx = intervalNum > 0 ? intervalNum : -intervalNum;
    return direction + intervalTable[idx];
  },
);

/* eslint-disable no-param-reassign */
const intervalCognitionSlice = createSlice({
  name: 'intervalCognition',
  initialState,
  reducers: {
    pressKey(state, action: PayloadAction<KeyNumber>) {
      if (state.selectedInterval.from === undefined) {
        state.selectedInterval.from = action.payload;
      } else if (state.selectedInterval.to === undefined) {
        state.selectedInterval.to = action.payload;
      } else {
        state.selectedInterval.from = state.selectedInterval.to;
        state.selectedInterval.to = action.payload;
      }
    },
  },
});
/* eslint-enable no-param-reassign */

export const { pressKey } = intervalCognitionSlice.actions;
export const { reducer } = intervalCognitionSlice;
