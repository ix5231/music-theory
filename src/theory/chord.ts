import _ from 'lodash';

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
  root: Pitch,
  base: Pitch,
  quality: ChordQuality
  tensions: Interval[],
}

const chordQualities: ChordIntervals[] = [
  {
    name: 'major',
    intervals: [4, 7],
  },
  {
    name: 'minor',
    intervals: [3, 7],
  },
  {
    name: 'diminished',
    intervals: [3, 6],
  },
  {
    name: 'augumented',
    intervals: [4, 8],
  },
  {
    name: 'omit3',
    intervals: [7],
    forbidden: [3, 4],
  },
];

export interface ChordSelectionWithRoot {
  type: 'withRoot',
  root: Pitch,
  others: Pitch[],
}

export interface ChordSelectionWithoutRoot {
  type: 'withoutRoot',
  pitches: Pitch[],
}

export type ChordSelection = ChordSelectionWithRoot | ChordSelectionWithoutRoot;

const matchChord = (intervals: Interval[]) => (ci: ChordIntervals): boolean => (
  ci.intervals.every((e) => intervals.includes(e))
  && !ci.forbidden?.some((e) => intervals.includes(e))
);

const findChordWithRoot = (sel: ChordSelectionWithRoot): Chord[] => {
  const intervals = sel.others.map((p) => calcInterval(sel.root, p));
  return chordQualities
    .filter(matchChord(intervals))
    .map((c) => ({
      root: sel.root,
      base: sel.root,
      quality: c.name,
      tensions: intervals.filter((e) => !c.intervals.includes(e)),
    }));
};

const findChordWithoutRoot = (sel: ChordSelectionWithoutRoot): Chord[] => sel.pitches
  .map((e) => ({
    type: 'withRoot',
    root: e,
    others: sel.pitches.filter((e2) => e2 !== e),
  } as ChordSelectionWithRoot))
  .flatMap(findChordWithRoot);

const findChordWithBase = (sel: ChordSelectionWithRoot): Chord[] => {
  const sel1: ChordSelectionWithoutRoot = {
    type: 'withoutRoot',
    pitches: [sel.root, ...sel.others],
  };
  const sel2: ChordSelectionWithoutRoot = {
    type: 'withoutRoot',
    pitches: _.cloneDeep(sel.others),
  };
  return [sel1, sel2].flatMap(
    findChordWithoutRoot,
  )
    .map((c) => ({
      ...c,
      base: sel.root,
    }));
};

export const findChord = (sel: ChordSelection): Chord[] => (sel.type === 'withRoot'
  ? findChordWithBase(sel)
  : findChordWithoutRoot(sel));

// TODO: deal with name with flat
const pitchName: Record<Pitch, string> = {
  0: 'C',
  1: 'C♯',
  2: 'D',
  3: 'D♯',
  4: 'E',
  5: 'F',
  6: 'F',
  7: 'G',
  8: 'G♯',
  9: 'A',
  10: 'A♯',
  11: 'B',
};

export const chordPrettyPrint = (chord: Chord): string => {
  if (chord.quality === 'minor') {
    return `${pitchName[chord.base]}m`;
  }
  return pitchName[chord.base];
};
