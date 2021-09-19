import { Story, Meta } from '@storybook/react';
import { ChordCognition } from './ChordCognition';

export default {
  component: ChordCognition,
  title: 'Organisms/ChordCognition',
} as Meta;

const Template: Story = () => <ChordCognition />;

export const Normal = Template.bind({});
Normal.args = { };
