import chords from './chords.json';

const chordData = chords as ChordData;

interface ChordData {
  [family: string]: {
    find: string;
    chords: {
      [bit: string]: ChordIntervals[];
    };
  };
}

export type PitchNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type IntervalNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface ChordIntervals {
  id: string,
}

export interface Chord {
  base: PitchNumber,
  id: string,
}

export interface ChordSelectionWithBase {
  type: 'withRoot',
  base: PitchNumber,
  others: PitchNumber[],
}

export interface ChordSelectionWithoutBase {
  type: 'withoutRoot',
  pitches: PitchNumber[],
}

export type ChordSelection = ChordSelectionWithBase | ChordSelectionWithoutBase;

const calcInterval = (root: PitchNumber, other: PitchNumber): IntervalNumber => (
  (((other - root) % 12) + 12) % 12
) as IntervalNumber;

const toIntervals = (sel: ChordSelectionWithBase): IntervalNumber[] => [0 as IntervalNumber]
  .concat(sel.others.map((e) => calcInterval(sel.base, e)));

/* eslint-disable no-bitwise */
const toBit = (ints: IntervalNumber[]): number => (
  ints.map((i) => 1 << i).reduce((pi, ci) => pi | ci)
);
/* eslint-enable no-bitwise */

const withRoot = (sel: ChordSelectionWithoutBase): ChordSelectionWithBase => ({
  type: 'withRoot',
  base: sel.pitches[0],
  others: sel.pitches.slice(1),
});

const chordSelectionToBit = (sel: ChordSelection): number => (sel.type === 'withRoot'
  ? toBit(toIntervals(sel))
  : toBit(toIntervals(withRoot(sel))));

export const findChord = (sel: ChordSelection): Chord[] => (
  Object
    .keys(chords)
    .flatMap((k) => (
      chordData[k]
        .chords[chordSelectionToBit(sel)]
        ?.map((c) => ({
          base: sel.type === 'withRoot'
            ? sel.base
            : sel.pitches[0],
          ...c,
        })) ?? []
    ))
);
