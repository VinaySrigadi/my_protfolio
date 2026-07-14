"use client";

import { useState, useEffect } from "react";

/**
 * Returns true after the component has mounted on the client.
 * Use this to guard client-only code and avoid hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use a microtask to avoid synchronous setState in effect body
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return mounted;
}
