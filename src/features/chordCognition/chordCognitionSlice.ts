import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { rootSelector } from 'app/selector';
import { findChord, pitchName, PitchNumber } from 'theory';

interface ChordCognitionState {
  selectedChord: {
    root?: number;
    other: number[];
  };
}

export const initialState: ChordCognitionState = {
  selectedChord: { root: undefined, other: [] },
};

export const stateSelector = createSelector(
  rootSelector,
  (state) => state.chordCognition,
);

export const detectedChordSelector = createSelector(
  stateSelector,
  ({ selectedChord: { root, other } }) => {
    const baseNum: PitchNumber | undefined = root && ((root % 12) as PitchNumber);
    const otherNum: PitchNumber[] = other.map((e) => e % 12) as PitchNumber[];

    return baseNum !== undefined && findChord({
      type: 'withRoot',
      base: baseNum,
      others: otherNum,
    }).map((c) => pitchName[c.base] + c.id);
  },
);

/* eslint-disable no-param-reassign */
const chordCognitionSlice = createSlice({
  name: 'chordCognition',
  initialState,
  reducers: {
    pressKey(state, action: PayloadAction<number>) {
      if (state.selectedChord.root === undefined) {
        state.selectedChord.root = action.payload;
      } else {
        state.selectedChord.other.push(action.payload);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset(_state, _action: PayloadAction) {
      return initialState;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { pressKey, reset } = chordCognitionSlice.actions;
export const { reducer } = chordCognitionSlice;
