import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import {
  Tab, TabContext, TabList, TabPanel,
} from './Tab';

export default {
  title: 'Molecules/Tab',
} as Meta;

const Template: Story = () => {
  const [selected, setSelected] = useState(0);

  return (
    <TabContext value={selected} onChange={(i) => setSelected(i)}>
      <TabList>
        <Tab label="1" index={0} />
        <Tab label="2" index={1} />
        <Tab label="3" index={2} />
      </TabList>
      <TabPanel index={0}>Tab1</TabPanel>
      <TabPanel index={1}>Tab2</TabPanel>
      <TabPanel index={2}>Tab3</TabPanel>
    </TabContext>
  );
};

export const Normal = Template.bind({});
Normal.args = { };
