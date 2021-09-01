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

export { };
