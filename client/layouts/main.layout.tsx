import React, { memo, FC } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import type { MainLayoutProps } from './mainLayout.interface';

export const MainLayout: FC<MainLayoutProps> = memo(({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
});
