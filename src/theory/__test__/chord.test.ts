import {
  findChord, ChordSelection, Chord, chordPrettyPrint,
} from 'theory/chord';

describe('findChord', () => {
  test('C#が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 1,
      others: [5, 8],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      base: 1,
      quality: 'major',
      tensions: [],
    }]);
  });

  test('Bが見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 11,
      others: [3, 6],
    };
    expect(findChord(sel)).toEqual([{
      root: 11,
      base: 11,
      quality: 'major',
      tensions: [],
    }]);
  });

  test('C#が見つけられる（ルート指定なし）', () => {
    const sel: ChordSelection = {
      type: 'withoutRoot',
      pitches: [1, 5, 8],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      base: 1,
      quality: 'major',
      tensions: [],
    }]);
  });

  test('C#/B#、C#Maj7/B#、E#m(11)/B#が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 0,
      others: [1, 5, 8],
    };
    const result = findChord(sel);
    expect(result).toEqual(
      expect.arrayContaining(
        [
          {
            root: 1,
            base: 0,
            quality: 'major',
            tensions: [],
          },
          {
            root: 1,
            base: 0,
            quality: 'major',
            tensions: [11],
          },
          {
            root: 5,
            base: 0,
            quality: 'minor',
            tensions: [8],
          },
        ],
      ),
    );
  });

  test('C(omit3)が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 0,
      others: [7],
    };
    const result = findChord(sel);
    expect(result).toEqual(
      expect.arrayContaining(
        [
          {
            root: 0,
            base: 0,
            quality: 'omit3',
            tensions: [],
          },
        ],
      ),
    );
  });
});

describe('chordPrettyPrint', () => {
  const testData: [ string, Chord][] = [
    [
      'E', {
        root: 4, base: 4, quality: 'major', tensions: [],
      },
    ],
    [
      'D♯', {
        root: 3, base: 3, quality: 'major', tensions: [],
      },
    ],
    [
      'Cm', {
        root: 0, base: 0, quality: 'minor', tensions: [],
      },
    ],
    [
      'Gm', {
        root: 7, base: 7, quality: 'minor', tensions: [],
      },
    ],
  ];

  test.each(testData)('コード名生成: %s', (name, chord) => {
    expect(chordPrettyPrint(chord)).toEqual(name);
  });
});

const expects = [
  [{
    root: 0,
    intervals: [4, 7, 11, 6],
  }, {
    root: 0,
    base: 0,
    baseQuality: 'major',
    tension: [6, 11],
  }, {
    root: 0,
    base: 0,
    baseQuality: 'major7',
    tension: [6],
  }, {
    name: 'CMaj7(+11)',
    intervals: ['R', 'M3', 'P5', 'M7', '+11'],
  }],
];

const data = [
  {
    id: 'major',
    intervals: ['R', 'M3', 'P5'],
    variant: {
      major7: {
        intervals: ['M7'],
      },
    },
  },
  {
    id: 'major7',
    intervals: ['R', 'M3', 'P5', 'M7'],
  },
  {
    id: 'major9',
    intervals: ['R', 'M3', 'P5', 'M7', '9'],
  },
];

export { };
