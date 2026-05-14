import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("swagger-ui-react", () => ({
  default: ({ url }: { url: string }) => (
    <div data-testid="swagger-ui" data-url={url} />
  ),
}));

vi.mock("swagger-ui-react/swagger-ui.css", () => ({}));

import Home from "./page";

describe("Home", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("renders SwaggerUI with the default 4.0 spec URL", () => {
    render(<Home />);
    const swagger = screen.getByTestId("swagger-ui");
    expect(swagger).toHaveAttribute(
      "data-url",
      "https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.0/docs/openapi.json",
    );
  });

  it("switches the SwaggerUI URL when a different version is selected", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.selectOptions(
      screen.getByLabelText(/select phpmyfaq version/i),
      "4.2",
    );

    expect(screen.getByTestId("swagger-ui")).toHaveAttribute(
      "data-url",
      "https://raw.githubusercontent.com/thorsten/phpMyFAQ/main/docs/openapi.json",
    );
  });

  it("offers all configured versions in the selector", () => {
    render(<Home />);
    const select = screen.getByLabelText(/select phpmyfaq version/i) as HTMLSelectElement;
    const values = Array.from(select.options).map((o) => o.value);
    expect(values).toEqual(["4.0", "4.1", "4.2"]);
  });

  it("does not apply the dark class when system prefers light", () => {
    render(<Home />);
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("toggles the dark class on the document element when the theme toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const toggle = screen.getByRole("button", { name: /toggle dark mode/i });

    await user.click(toggle);
    expect(document.documentElement).toHaveClass("dark");

    await user.click(toggle);
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("follows the system preference when prefers-color-scheme is dark", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
      onchange: null,
    }));

    render(<Home />);
    expect(document.documentElement).toHaveClass("dark");

    vi.mocked(window.matchMedia).mockReset();
  });
});
