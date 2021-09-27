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

const toExtendedMarkers = (base: number, other: number[]): ExtendedMarkers => (
  {
    [base]: 'pink',
    ...other
      .reduce<ExtendedMarkers>((acc, o) => ({ ...acc, [o]: 'blue' }), {}),
  }
);

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

const toMarkers = (base: number, other: number[], octave: number): Markers[] => {
  const markers = splitMarkers(toExtendedMarkers(base, other));
  const res = [];
  for (let i = 0; i < octave; i++) {
    res.push(markers[i] ?? {});
  }

  return res;
};

const Keyboards = () => {
  const dispatch = useDispatch();

  const { root, other } = useSelector(stateSelector).selectedChord;
  const markers = root !== undefined ? toMarkers(root, other, 2) : undefined;

  return (
    <>
      <Keyboard onClick={(k) => { dispatch(pressKey(k)); }} markers={markers && markers[0]} />
      <Keyboard
        onClick={(k) => { dispatch(pressKey(k + 12)); }}
        markers={markers && markers[1]}
      />
    </>
  );
};

export const ChordCognition = (): JSX.Element => {
  const dispatch = useDispatch();

  const chords = useSelector(detectedChordSelector);

  return (
    <div>
      <div tw="flex flex-row">
        <Keyboards />
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
