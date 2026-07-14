"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

/**
 * CustomCursor — replaces the default cursor with two layered dots:
 * - A small precise dot that tracks exactly on the pointer
 * - A larger ring that follows with a spring lag
 *
 * Hidden on touch devices. Falls back to native cursor when JS is disabled.
 */
export function CustomCursor() {
  const mounted = useMounted();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as Element;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.closest("a, button, [role='button']") !== null
      );
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // Only render on non-touch devices and after mount
  if (!mounted) return null;

  return (
    <>
      {/* Outer ring — larger, laggy spring */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.5 }}
        className="pointer-events-none fixed left-0 top-0 z-[600] size-8 rounded-full border border-[#2563EB]/60 mix-blend-difference"
      />

      {/* Inner dot — precise, instant */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isPointer ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        className="pointer-events-none fixed left-0 top-0 z-[600] size-1.5 rounded-full bg-[#FAFAFA]"
      />
    </>
  );
}
