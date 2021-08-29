import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import IntervalCognition from './IntervalCognition';

export default {
  component: IntervalCognition,
  title: 'Organisms/IntervalCognition',
} as Meta;

const Template: Story<ComponentProps<typeof IntervalCognition>> = () => <IntervalCognition />;

export const Normal = Template.bind({});
Normal.args = {};
