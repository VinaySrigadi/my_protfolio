"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element is attracted (1 = full position, 0.5 = half) */
  strength?: number;
  /** Radius in px — how far the cursor must be before attraction begins */
  radius?: number;
  as?: "button" | "div" | "a";
  onClick?: () => void;
  href?: string;
  "aria-label"?: string;
}

/**
 * MagneticButton — element that magnetically follows the cursor within a radius.
 * Used for primary CTA buttons in the hero and contact sections.
 * Falls back gracefully when pointer accuracy is low (touch devices).
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Tag = "button",
  onClick,
  href,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 350, damping: 25 });
  const y = useSpring(rawY, { stiffness: 350, damping: 25 });

  const scale = useTransform(x, [-40, 0, 40], [1.05, 1, 1.05]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const MotionTag = motion[Tag] as typeof motion.button;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLButtonElement>}
      style={{ x, y, scale }}
      onMouseMove={onMouseMove as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...(Tag === "a" && href ? { href } : {})}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex select-none touch-none",
        className
      )}
    >
      {children}
    </MotionTag>
  );
}
