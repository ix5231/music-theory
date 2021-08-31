import { findChord, ChordSelection } from 'theory/chord';

describe('findChord', () => {
  test('C#が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 1,
      others: [5, 8],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
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
      quality: 'major',
      tensions: [],
    }]);
  });

  test('Dmが見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 2,
      others: [5, 9],
    };
    expect(findChord(sel)).toEqual([{
      root: 2,
      quality: 'minor',
      tensions: [],
    }]);
  });

  test('Adimが見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 9,
      others: [0, 3],
    };
    expect(findChord(sel)).toEqual([{
      root: 9,
      quality: 'diminished',
      tensions: [],
    }]);
  });

  test('Eaugが見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 4,
      others: [8, 0],
    };
    expect(findChord(sel)).toEqual([{
      root: 4,
      quality: 'augumented',
      tensions: [],
    }]);
  });

  test('C#Maj7が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 1,
      others: [5, 8, 0],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      quality: 'major',
      tensions: [11],
    }]);
  });

  test('C#が見つけられる（ルート指定なし）', () => {
    const sel: ChordSelection = {
      type: 'withoutRoot',
      pitches: [1, 5, 8],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      quality: 'major',
      tensions: [],
    }]);
  });

  test('C#/B#が見つけられる', () => {
    const sel: ChordSelection = {
      type: 'withRoot',
      root: 5,
      others: [1, 8, 0],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      base: 11,
      quality: 'major',
      tensions: [],
    }]);
  });
});

export { };
