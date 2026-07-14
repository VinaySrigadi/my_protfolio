"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the given CSS media query matches.
 * @example const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    // Use the event-based pattern to satisfy react-hooks/set-state-in-effect
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);

    // Sync initial value via a microtask to avoid synchronous setState in effect
    const syncInitial = () => setMatches(mql.matches);
    const raf = requestAnimationFrame(syncInitial);

    return () => {
      mql.removeEventListener("change", handler);
      cancelAnimationFrame(raf);
    };
  }, [query]);

  return matches;
}
