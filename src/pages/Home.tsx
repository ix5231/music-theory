import { useState } from 'react';
import {
  Tab, TabContext, TabList, TabPanel,
} from 'molecules';
import { Layout } from 'templates';
import IntervalCognition from 'organisms/IntervalCognition';
import { ChordCognition } from 'organisms/ChordCognition';

export const Home = (): JSX.Element => {
  const [selected, setSelected] = useState(0);

  return (
    <Layout>
      <TabContext value={selected} onChange={(i) => setSelected(i)}>
        <TabList>
          <Tab label="Interval" index={0} />
          <Tab label="Chord" index={1} />
        </TabList>
        <TabPanel index={0}><IntervalCognition /></TabPanel>
        <TabPanel index={1}><ChordCognition /></TabPanel>
      </TabContext>
    </Layout>
  );
};
