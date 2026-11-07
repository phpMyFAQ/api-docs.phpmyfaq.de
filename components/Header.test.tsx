import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import Header from './Header';

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );
}

describe('Header', () => {
  it('links the logo back to the main phpMyFAQ site', () => {
    renderHeader();
    const logo = screen.getByRole('link', { name: /logo of phpmyfaq/i });
    expect(logo).toHaveAttribute('href', 'https://www.phpmyfaq.de/');
  });

  it('shows the main site navigation plus an active API entry', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    const names = within(nav)
      .getAllByRole('link')
      .map((a) => a.textContent);
    expect(names).toEqual(['Features', 'Documentation', 'Support', 'Download', 'API']);
    expect(within(nav).getByRole('link', { name: 'API' })).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: 'Download' })).toHaveAttribute(
      'href',
      'https://www.phpmyfaq.de/download',
    );
  });

  it('links to the GitHub repository', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /phpmyfaq on github/i })).toHaveAttribute(
      'href',
      'https://github.com/thorsten/phpMyFAQ',
    );
  });

  it('toggles the mobile navigation', async () => {
    const user = userEvent.setup();
    renderHeader();
    const button = screen.getByRole('button', { name: /toggle navigation/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
