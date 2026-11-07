import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('shows the copyright with the current year', () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(`2001-${year}`))).toBeInTheDocument();
  });

  it('links to the main site sections', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Download' })).toHaveAttribute('href', 'https://www.phpmyfaq.de/download');
    expect(screen.getByRole('link', { name: 'Imprint' })).toHaveAttribute('href', 'https://www.phpmyfaq.de/imprint');
  });

  it('shows the social links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /phpmyfaq at github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /discord/i })).toBeInTheDocument();
  });
});
