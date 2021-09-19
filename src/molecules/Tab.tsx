import { createContext, useContext } from 'react';

interface TabContextType {
  value: number;
  onChange?: (index: number) => void;
}

const TabCtx = createContext<TabContextType>({
  value: 0,
});

interface TabPanelProps {
  children: React.ReactNode;
  index: number,
}

export const TabPanel = ({ children, index }: TabPanelProps): JSX.Element | null => {
  const { value } = useContext(TabCtx);

  return value === index ? <div role="tabpanel">{children}</div> : null;
};

interface TabListProps {
  children: React.ReactNode;
}

export const TabList = ({ children }: TabListProps): JSX.Element => <div role="tablist">{children}</div>;

interface TabProps {
  label: string;
  index: number;
}

export const Tab = ({ label, index }: TabProps): JSX.Element => {
  const { onChange } = useContext(TabCtx);

  return (
    <div role="tab">
      <button
        type="button"
        onClick={() => onChange && onChange(index)}
      >
        {label}
      </button>
    </div>
  );
};

interface TabContextProps extends TabContextType {
  children?: React.ReactNode;
}

export const TabContext = ({ children, value, onChange }:TabContextProps): JSX.Element => (
  <TabCtx.Provider value={{
    value,
    onChange,
  }}
  >
    {children}
  </TabCtx.Provider>
);
