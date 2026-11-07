import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/ThemeProvider';

vi.mock('swagger-ui-react', () => ({
  default: ({ url }: { url: string }) => <div data-testid="swagger-ui" data-url={url} />,
}));

vi.mock('swagger-ui-react/swagger-ui.css', () => ({}));

import Home from './page';

function renderHome() {
  return render(
    <ThemeProvider>
      <Home />
    </ThemeProvider>,
  );
}

describe('Home', () => {
  it('renders SwaggerUI with the default 4.0 spec URL', () => {
    renderHome();
    const swagger = screen.getByTestId('swagger-ui');
    expect(swagger).toHaveAttribute(
      'data-url',
      'https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.0/docs/openapi.json',
    );
  });

  it('switches the SwaggerUI URL when a different version is selected', async () => {
    const user = userEvent.setup();
    renderHome();

    await user.selectOptions(screen.getByLabelText(/select phpmyfaq version/i), '4.2');

    expect(screen.getByTestId('swagger-ui')).toHaveAttribute(
      'data-url',
      'https://raw.githubusercontent.com/thorsten/phpMyFAQ/main/docs/openapi.json',
    );
  });

  it('offers all configured versions in the selector', () => {
    renderHome();
    const select = screen.getByLabelText(/select phpmyfaq version/i) as HTMLSelectElement;
    const values = Array.from(select.options).map((o) => o.value);
    expect(values).toEqual(['4.0', '4.1', '4.2']);
  });

  it('wraps Swagger UI in the light container by default', () => {
    renderHome();
    expect(screen.getByTestId('swagger-ui').parentElement).toHaveClass('swagger-container-light');
  });

  it('wraps Swagger UI in the dark container when the theme is dark', () => {
    localStorage.setItem('theme', 'dark');
    renderHome();
    expect(screen.getByTestId('swagger-ui').parentElement).toHaveClass('swagger-container-dark');
  });
});
