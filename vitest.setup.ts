import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("dark");
});

type MediaQueryListener = (event: { matches: boolean; media: string }) => void;

interface MockMediaQueryList {
  matches: boolean;
  media: string;
  addEventListener: (type: string, listener: MediaQueryListener) => void;
  removeEventListener: (type: string, listener: MediaQueryListener) => void;
  addListener: (listener: MediaQueryListener) => void;
  removeListener: (listener: MediaQueryListener) => void;
  dispatchEvent: () => boolean;
  onchange: null;
}

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string): MockMediaQueryList => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
      onchange: null,
    })),
  });
}
