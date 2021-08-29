import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Keyboard from './Keyboard';

export default {
  component: Keyboard,
  title: 'Molecules/Keyboard',
} as Meta;

const Template: Story<ComponentProps<typeof Keyboard>> = (props) => <Keyboard {...props} />;

export const Normal = Template.bind({});
Normal.args = {
  onClick: () => {},
};
