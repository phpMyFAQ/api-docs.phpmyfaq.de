// The theme lives on <html data-theme> and in localStorage. This store lets
// React read it through useSyncExternalStore without setting state in effects.
// Ported from www.phpmyfaq.de so both sites behave the same.

export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();
let current: Theme | null = null;

function detect(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage blocked: fall through to the system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getTheme(): Theme {
  if (current === null) current = detect();
  return current;
}

export function getServerTheme(): Theme {
  return 'light';
}

export function setTheme(theme: Theme): void {
  current = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Forgets the cached theme so the next read detects it again. Test-only.
export function resetThemeStore(): void {
  current = null;
}

// Inlined into <head> so the first paint already has the right theme.
export const themeBootScript =
  "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()";
