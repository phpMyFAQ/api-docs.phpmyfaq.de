'use client';

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';
import { getServerTheme, getTheme, setTheme, subscribe, Theme } from '@/lib/themeStore';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Renders 'light' on the server and during hydration, then the stored choice.
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(theme === 'light' ? 'dark' : 'light'), [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
