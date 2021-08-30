import { findChord, ChordSelection } from 'theory/chord';

describe('findChord', () => {
  test('C#メジャーが見つけられる', () => {
    const sel: ChordSelection = {
      root: 1,
      others: [5, 8],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      quality: 'major',
    }]);
  });
  test('Bメジャーが見つけられる', () => {
    const sel: ChordSelection = {
      root: 11,
      others: [3, 6],
    };
    expect(findChord(sel)).toEqual([{
      root: 11,
      quality: 'major',
    }]);
  });
});

export { };
