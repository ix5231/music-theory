import _ from 'lodash';
import chords from './chords.json'

export type Pitch = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Interval = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const calcInterval = (root: Pitch, other: Pitch): Interval => (
  (((other - root) % 12) + 12) % 12
) as Interval;

type ChordQuality = 'major' | 'minor' | 'augumented' | 'diminished' | 'omit3';

interface ChordIntervals {
  name: ChordQuality,
  intervals: Interval[],
  forbidden?: Interval[],
}

export interface Chord {
  base: Pitch,
  id: string,
}

export interface ChordSelectionWithBase {
  type: 'withRoot',
  base: Pitch,
  others: Pitch[],
}

export interface ChordSelectionWithoutBase {
  type: 'withoutRoot',
  pitches: Pitch[],
}

export type ChordSelection = ChordSelectionWithBase | ChordSelectionWithoutBase;

export const findChord = (selection: ChordSelection) => {}