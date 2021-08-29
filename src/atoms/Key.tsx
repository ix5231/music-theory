import { memo } from 'react';
import tw from 'twin.macro';

const keyColorStyle = {
  white: tw`bg-white hover:bg-gray-50 shadow`,
  black: tw`bg-gray-700 hover:bg-black`,
};

const markerStyle = {
  default: tw`scale-x-0`,
  blue: tw`border-blue-400 scale-x-100`,
  pink: tw`border-pink-600 scale-x-100`,
};

interface Props {
  color: keyof typeof keyColorStyle,
  marker?: keyof typeof markerStyle,
  className?: string,
  onClick?: () => void,
}

const Key = ({
  color, marker, className, onClick,
}: Props): JSX.Element => (
  <span className={className} tw="inline-flex flex-col">
    <button
      type="button"
      css={[tw`appearance-none w-4 h-8 rounded border-none`, keyColorStyle[color]]}
      onClick={onClick}
    >
      {' '}
    </button>
    <span
      tw="transform border-b-0 border-r-0 border-l-0 border-t-4 border-solid w-2 mx-1 mt-0.5 shadow rounded transition-all duration-75"
      css={markerStyle[marker ?? 'default']}
    />
  </span>
);

Key.defaultProps = {
  marker: 'default',
  className: '',
  onClick: () => { },
};

export default memo(Key);
