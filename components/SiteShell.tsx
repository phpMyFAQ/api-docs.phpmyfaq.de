'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import Header from './Header';
import Footer from './Footer';

export default function SiteShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
