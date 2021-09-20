import { ReactNode } from 'react';
import 'twin.macro';

interface Props {
  children:ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => (
  <main tw="max-w-3xl mx-auto">
    <h1 tw="font-sans my-8">
      Music theory tool
    </h1>
    {children}
  </main>
);
