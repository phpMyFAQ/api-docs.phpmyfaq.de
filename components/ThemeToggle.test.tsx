import { describe, it, expect, vi } from 'vitest';
import { createMatchMedia } from '@/test/matchMedia';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  it('starts light when the system prefers light and nothing is stored', () => {
    renderToggle();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('switches data-theme and persists the choice', async () => {
    const user = userEvent.setup();
    renderToggle();
    const button = screen.getByRole('button', { name: /toggle theme/i });

    await user.click(button);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(button);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('restores a stored dark theme', () => {
    localStorage.setItem('theme', 'dark');
    renderToggle();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('follows the system preference when prefers-color-scheme is dark', () => {
    vi.mocked(window.matchMedia).mockImplementation(createMatchMedia(true));

    renderToggle();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    vi.mocked(window.matchMedia).mockReset();
  });
});
