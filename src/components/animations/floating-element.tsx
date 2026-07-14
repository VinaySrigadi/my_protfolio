"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical float distance in px */
  amplitude?: number;
  /** Duration of one float cycle in seconds */
  period?: number;
  /** Phase offset for de-syncing multiple floating elements */
  phase?: number;
}

/**
 * FloatingElement — continuously floats its child up and down.
 * Used for floating icons in the hero section.
 * Auto-paused with prefers-reduced-motion.
 */
export function FloatingElement({
  children,
  className,
  amplitude = 10,
  period = 4,
  phase = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration: period,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
}
