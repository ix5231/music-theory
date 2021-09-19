import { ComponentProps, memo, useCallback } from 'react';
import tw from 'twin.macro';
import NormalKey from '../atoms/Key';

type KeyNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type Markers = Record<KeyNumber, ComponentProps<typeof NormalKey>['marker']>;

interface Props {
  onClick: (keynum: KeyNumber) => void;
  markers?: Markers
}

type KeyProps =
  Omit<ComponentProps<typeof NormalKey>, 'onClick'> &
  Props & {
    num: KeyNumber,
  };

const Key = ({
  num, onClick, markers, ...props
}: KeyProps) => {
  const clbk = useCallback(() => onClick(num), [onClick, num]);

  return (
    <NormalKey
      aria-label={`Key ${num}`}
      onClick={clbk}
      marker={markers && markers[num]}
      tw="mx-1 my-0.5"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

Key.defaultProps = {
  markers: {},
};

const Spacer = memo(tw.span`mx-1.5 my-0.5`);

export const Keyboard = (props :Props): JSX.Element => (
  /* eslint-disable react/jsx-props-no-spreading */
  <div aria-label="Keyboard">
    <Spacer />
    <Key color="black" num={1} {...props} />
    <Key color="black" num={3} {...props} />
    <Spacer />
    <Spacer />
    <Key color="black" num={6} {...props} />
    <Key color="black" num={8} {...props} />
    <Key color="black" num={10} {...props} />
    <br />
    <Key color="white" num={0} {...props} />
    <Key color="white" num={2} {...props} />
    <Key color="white" num={4} {...props} />
    <Key color="white" num={5} {...props} />
    <Key color="white" num={7} {...props} />
    <Key color="white" num={9} {...props} />
    <Key color="white" num={11} {...props} />
  </div>
  /* eslint-enable react/jsx-props-no-spreading */
);

Keyboard.defaultProps = {
  markers: {},
};
