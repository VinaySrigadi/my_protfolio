"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: "up" | "down" | null;
  scrollProgress: number; // 0–1
}

/**
 * Tracks window scroll position, direction, and progress (0→1).
 */
export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    scrollProgress: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handler = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const scrollDirection = scrollY > lastScrollY ? "down" : "up";

      lastScrollY = scrollY;
      setPosition({ scrollY, scrollX, scrollDirection, scrollProgress });
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return position;
}
