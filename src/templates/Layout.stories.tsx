import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Layout } from './Layout';

export default {
  component: Layout,
  title: 'Template/Layout',
} as Meta;

const Template: Story<ComponentProps<typeof Layout>> = (props) => <Layout {...props} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'This is Content',
};
