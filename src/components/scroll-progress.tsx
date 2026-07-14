"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a fixed thin bar at the top of the viewport
 * that fills as the user scrolls down the page.
 * Driven by framer-motion's native scroll tracking for 60fps performance.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed left-0 right-0 top-0 z-[700] h-[2px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
    />
  );
}
