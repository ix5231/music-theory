import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { TabbedLayout } from 'molecules';

export default {
  component: TabbedLayout,
  title: 'Molecules/TabbedLayout',
} as Meta;

const Template: Story<ComponentProps<typeof TabbedLayout>> = (
  () => <TabbedLayout />
);

export const Normal = Template.bind({});
Normal.args = { };
