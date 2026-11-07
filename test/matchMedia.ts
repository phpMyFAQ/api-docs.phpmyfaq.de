import { vi } from 'vitest';

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

// jsdom does not implement window.matchMedia; this stands in for it. The mock
// covers only what the theme store touches, hence the cast.
export type MatchMedia = (query: string) => MediaQueryList;

export function createMatchMedia(matches: boolean): MatchMedia {
  return (query: string): MediaQueryList => {
    const list: MockMediaQueryList = {
      matches,
      media: query,
      addEventListener: vi.fn<MockMediaQueryList['addEventListener']>(),
      removeEventListener: vi.fn<MockMediaQueryList['removeEventListener']>(),
      addListener: vi.fn<MockMediaQueryList['addListener']>(),
      removeListener: vi.fn<MockMediaQueryList['removeListener']>(),
      dispatchEvent: vi.fn<MockMediaQueryList['dispatchEvent']>(() => false),
      onchange: null,
    };
    return list as unknown as MediaQueryList;
  };
}
