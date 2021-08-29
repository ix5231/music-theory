import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Key from './Key';

export default {
  component: Key,
  title: 'Atom/Key',
} as Meta;

const Template: Story<ComponentProps<typeof Key>> = (args) => <Key {...args} />;

export const White = Template.bind({});
White.args = {
  color: 'white',
};

export const Black = Template.bind({});
Black.args = {
  color: 'black',
};
