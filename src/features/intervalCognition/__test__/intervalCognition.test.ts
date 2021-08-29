import fc from 'fast-check';
import {
  reducer, pressKey, initialState, KeyNumber, intervalSelector,
} from '../intervalCognitionSlice';

const arbitaryKeyNumber = fc.integer(0, 11).map((v) => v as KeyNumber);

describe('Reducer/pressKey', () => {
  test('1回押せばそれがfromに、2回押めばそれがtoに、それ以降はtoがfromに移動し、toに新しく押したものがはいる', () => {
    fc.assert(
      fc.property(fc.array(arbitaryKeyNumber), (data) => {
        let state = initialState;
        expect(state.selectedInterval).toEqual({
          from: undefined,
          to: undefined,
        });

        data.forEach((v, i) => {
          state = reducer(state, pressKey(v));
          if (i === 0) {
            expect(state.selectedInterval).toEqual({
              from: v,
              to: undefined,
            });
          } else {
            expect(state.selectedInterval).toEqual({
              from: data[i - 1],
              to: v,
            });
          }
        });
      }),
    );
  });

  test('0を押すとfromが0、toがundefinedになる', () => {
    expect(reducer(undefined, pressKey(0))).toEqual({
      selectedInterval: {
        from: 0,
        to: undefined,
      },
    });
  });

  test('0、2を押すとfromが0、toが2になる', () => {
    const s = reducer(undefined, pressKey(0));
    expect(reducer(s, pressKey(2))).toEqual({
      selectedInterval: {
        from: 0,
        to: 2,
      },
    });
  });

  test('0、2、11を押すとfromが2、toが11になる', () => {
    const s = reducer(undefined, pressKey(0));
    const s2 = reducer(s, pressKey(2));
    expect(reducer(s2, pressKey(11))).toEqual({
      selectedInterval: {
        from: 2,
        to: 11,
      },
    });
  });
});

describe('Selector/intervalSelector', () => {
  test('逆方向ならば、Ascendant <-> Descendantが入れ替わる', () => {
    fc.assert(
      fc.property(fc.tuple(arbitaryKeyNumber, arbitaryKeyNumber), ([from, to]) => {
        const interval = intervalSelector(
          { intervalCognition: { selectedInterval: { from, to } } },
        );
        expect(interval).not.toBeUndefined();

        const inverse = intervalSelector(
          { intervalCognition: { selectedInterval: { from: to, to: from } } },
        );

        if (interval?.match(/^Ascendant /)) {
          const i = interval.replace(/^Ascendant /, '');
          expect(inverse).toEqual(`Descendant ${i}`);
        } else if (interval?.match(/^Descendant /)) {
          const i = interval.replace(/^Descendant /, '');
          expect(inverse).toEqual(`Ascendant ${i}`);
        } else {
          expect(inverse).toEqual(interval);
        }
      }),
    );
  });

  test('普通のやつ', () => {
    expect(intervalSelector({ intervalCognition: { selectedInterval: { from: 3, to: 4 } } })).toEqual('Ascendant minor 2nd');
    expect(intervalSelector({ intervalCognition: { selectedInterval: { from: 0, to: 7 } } })).toEqual('Ascendant Perfect 5th');
    expect(intervalSelector({ intervalCognition: { selectedInterval: { from: 9, to: 7 } } })).toEqual('Descendant Major 2nd');
    expect(intervalSelector({ intervalCognition: { selectedInterval: { from: 5, to: 5 } } })).toEqual('Perfect Unison');
  });
});

export { };
