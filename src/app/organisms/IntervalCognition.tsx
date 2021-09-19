import { ComponentProps, useCallback } from 'react';
import {
  intervalSelector, KeyNumber, pressKey, selectedIntervalSelector,
} from 'features/intervalCognition';
import { Keyboard } from 'molecules/Keyboard';
import { useDispatch, useSelector } from 'react-redux';

type MarkersType = ComponentProps<typeof Keyboard>['markers'];
const createMarkersProp = (from?: KeyNumber, to?: KeyNumber): MarkersType => {
  const r: MarkersType = {
    0: 'default',
    1: 'default',
    2: 'default',
    3: 'default',
    4: 'default',
    5: 'default',
    6: 'default',
    7: 'default',
    8: 'default',
    9: 'default',
    10: 'default',
    11: 'default',
  };
  if (from !== undefined) {
    r[from] = 'blue';
  }
  if (to !== undefined) {
    r[to] = 'pink';
  }
  return r;
};

const IntervalCognition = (): JSX.Element => {
  const dispatch = useDispatch();
  const recognizedInterval = useSelector(intervalSelector);
  const { from, to } = useSelector(selectedIntervalSelector);

  const onClick = useCallback((k: KeyNumber) => dispatch(pressKey(k)), [dispatch]);

  return (
    <div>
      <Keyboard onClick={onClick} markers={createMarkersProp(from, to)} />
      <div>{recognizedInterval}</div>
    </div>
  );
};

export default IntervalCognition;
