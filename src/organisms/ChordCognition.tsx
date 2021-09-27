import { Marker } from 'atoms/Key';
import _ from 'lodash';
import { Keyboard, Markers } from 'molecules';
import {
  stateSelector, reset, pressKey, detectedChordSelector,
} from 'features/chordCognition';
import { useDispatch, useSelector } from 'react-redux';
import 'twin.macro';

interface ExtendedMarkers {
  [keynum: number]: Marker;
}

const splitMarkers = (em: ExtendedMarkers): Record<number, Markers> => (
  Object.entries(em)
    .reduce<Record<number, Markers>>((acc, [k, v]) => (
    _.merge(acc, {
      [Math.floor(Number(k) / 12)]: {
        [Number(k) % 12]: v as Marker,
      },
    })),
  {})
);

interface Props {
  octaves: number,
  markers?: ExtendedMarkers;
  onPress: (keynum: number) => void;
}

const Keyboards = ({ octaves, markers, onPress }:Props) => {
  const markerss = markers && splitMarkers(markers);

  return (
    <>
      {_.range(octaves).map((n) => (
        <Keyboard
          key={n}
          onClick={(k) => { onPress(k + 12 * n); }}
          markers={markerss && markerss[n]}
        />
      ))}
    </>
  );
};

const makeMarkers = (base: number, other: number[]): ExtendedMarkers => (
  {
    [base]: 'pink',
    ...other
      .reduce<ExtendedMarkers>((acc, o) => ({ ...acc, [o]: 'blue' }), {}),
  }
);

export const ChordCognition = (): JSX.Element => {
  const dispatch = useDispatch();

  const chords = useSelector(detectedChordSelector);
  const { root, other } = useSelector(stateSelector).selectedChord;

  return (
    <div>
      <div tw="flex flex-row">
        <Keyboards
          octaves={2}
          markers={root !== undefined ? makeMarkers(root, other) : undefined}
          onPress={(k) => dispatch(pressKey(k))}
        />
      </div>
      <button
        type="button"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
      <div>Detected Chord</div>
      <div>
        {chords}
      </div>
    </div>
  );
};
