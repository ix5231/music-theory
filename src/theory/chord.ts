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
  quality: ChordQuality
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

export interface ChordSelection {
  root: Pitch,
  others: Pitch[],
}

export const findChord = (sel: ChordSelection): Chord[] => {
  const intervals = sel.others.map((p) => calcInterval(sel.root, p));
  return chordQualities
    .filter((cq) => {
      if (cq.intervals.length !== intervals.length) return false;
      return cq.intervals.every((e, i) => e === intervals[i]);
    })
    .map((c) => ({
      root: sel.root,
      quality: c.name,
    }));
};
