import { findChord, ChordSelection } from 'theory/chord';

describe('findChord', () => {
  test('C#が見つけられる', () => {
    const sel: ChordSelection = {
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
      root: 1,
      others: [5, 8, 0],
    };
    expect(findChord(sel)).toEqual([{
      root: 1,
      quality: 'major',
      tensions: [11],
    }]);
  });
});

export { };
