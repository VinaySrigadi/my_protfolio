"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Distance to travel in px */
  distance?: number;
  /** Only animate once — freeze after first view */
  once?: boolean;
  /** Fraction of element visible before triggering (0–1) */
  threshold?: number;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * FadeIn — wraps children in a scroll-triggered fade + slide animation.
 * Respects prefers-reduced-motion automatically (framer-motion handles this).
 */
export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  threshold = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const { x: dx, y: dy } = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dx * distance, y: dy * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.0, 0.0, 0.2, 1.0],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
