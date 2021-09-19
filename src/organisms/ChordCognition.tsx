import { Marker } from 'atoms/Key';
import _ from 'lodash';
import { Keyboard, KeyNumber, Markers } from 'molecules';
import { useState } from 'react';
import { findChord } from 'theory';
import { pitchName } from 'theory/pitch';
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

export const ChordCognition = (): JSX.Element => {
  const [base, setBase] = useState<number | undefined>(undefined);
  const [other, setOther] = useState<number[]>([]);
  const markers = base !== undefined ? toMarkers(base, other, 2) : undefined;

  const baseNum: KeyNumber | undefined = base && ((base % 12) as KeyNumber);
  const otherNum: KeyNumber[] = other.map((e) => e % 12) as KeyNumber[];

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
        <Keyboard onClick={(k) => { set(k); }} markers={markers && markers[0]} />
        <Keyboard onClick={(k) => { set(k + 12); }} markers={markers && markers[1]} />
      </div>
      <button
        type="button"
        onClick={() => {
          setBase(undefined);
          setOther([]);
        }}
      >
        Reset
      </button>
      <div>Detected Chord</div>
      <div>
        {baseNum !== undefined && findChord({
          type: 'withRoot',
          base: baseNum,
          others: otherNum,
        }).map((c) => pitchName[c.base] + c.id)}
      </div>
    </div>
  );
};
