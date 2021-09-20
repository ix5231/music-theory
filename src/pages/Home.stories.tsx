import { Story, Meta } from '@storybook/react';
import { Home } from 'pages';

export default {
  component: Home,
  title: 'Page/Home',
} as Meta;

const Template: Story = () => <Home />;

export const Normal = Template.bind({});
Normal.args = { };
