"use client";

import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Number of decimal places */
  decimals?: number;
}

/**
 * AnimatedCounter — animates a number from 0 to the target value
 * when the element scrolls into view.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const countRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    const el = countRef.current;
    if (!el) return;

    const startTime = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = easedProgress * value;

      el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  }, [isVisible, value, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      <span ref={countRef} aria-hidden="true" className={cn(className)}>
        {prefix}0{suffix}
      </span>
    </span>
  );
}
