import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { resetThemeStore } from './lib/themeStore';
import { createMatchMedia, type MatchMedia } from './test/matchMedia';

function resetTheme(): void {
  localStorage.clear();
  resetThemeStore();
  document.documentElement.removeAttribute('data-theme');
}

beforeEach(resetTheme);

afterEach(() => {
  cleanup();
  resetTheme();
});

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn<MatchMedia>(createMatchMedia(false)),
  });
}
