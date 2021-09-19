import { Marker } from 'atoms/Key';
import _ from 'lodash';
import { Keyboard, Markers } from 'molecules';
import { useState } from 'react';
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

const splitMarkers = (em: ExtendedMarkers): Markers[] => (
  Object.values(
    Object.entries(em)
      .reduce<Record<number, Markers>>((acc, [k, v]) => (
      _.merge(acc, {
        [Math.floor(Number(k) / 12)]: {
          [Number(k) % 12]: v as Marker,
        },
      })),
    {}),
  )
);

const toMarkers = (base: number, other: number[]): Markers[] => (
  splitMarkers(toExtendedMarkers(base, other))
);

export const ChordCognition = (): JSX.Element => {
  const [base, setBase] = useState<number | undefined>(undefined);
  const [other, setOther] = useState<number[]>([]);
  const markers = base ? toMarkers(base, other) : [{}, {}];

  const set = (k: number) => {
    if (base === undefined) {
      setBase(k);
    } else {
      setOther([...other, k]);
    }
  };

  return (
    <div>
      <div tw="flex flex-row">
        <Keyboard onClick={(k) => { set(k); }} markers={markers[0]} />
        <Keyboard onClick={(k) => { set(k + 12); }} markers={markers[1]} />
      </div>
      <div>Detected Chord here</div>
      <div>
        base:
        {base}
      </div>
      <div>
        other:
        {other}
      </div>
    </div>
  );
};
