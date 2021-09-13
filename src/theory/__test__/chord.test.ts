import {
  findChord, ChordSelection, Chord
} from 'theory/chord';

describe('findChord', () => {
  const withRoot: {select: ChordSelection, find: Chord}[] = [
    {
      // E
      select: {
        type: 'withRoot',
        base: 4,
        others: [8, 11]
      },
      find: {
        base: 4,
        id: 'major',
      },
    },
    {
      // Fm
      select: {
        type: 'withRoot',
        base: 5,
        others: [8, 0]
      },
      find: {
        base: 5,
        id: 'major',
      },
    }
  ]

  test.each(withRoot)('Chord recognize (w/root) test #%#', ({select, find}) => {
    expect(findChord(select)).toEqual(expect.arrayContaining([find]))
  })
})

export { };
