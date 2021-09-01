import _ from 'lodash';

export type Pitch = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Interval = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const calcInterval = (root: Pitch, other: Pitch): Interval => (
  (((other - root) % 12) + 12) % 12
) as Interval;

type ChordQuality = 'major' | 'minor' | 'augumented' | 'diminished';

interface ChordIntervals {
  name: ChordQuality,
  intervals: Interval[],
}

interface Chord {
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

const findChordWithRoot = (sel: ChordSelectionWithRoot): Chord[] => {
  const intervals = sel.others.map((p) => calcInterval(sel.root, p));
  return chordQualities
    .filter((cq) => cq.intervals.every((e) => intervals.includes(e)))
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
