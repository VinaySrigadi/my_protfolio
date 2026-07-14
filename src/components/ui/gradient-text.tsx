"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Gradient direction — default left-to-right */
  direction?: "lr" | "rl" | "diagonal";
  /** Whether to apply an animation pulse */
  animated?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * GradientText — renders text with the portfolio's primary→secondary gradient.
 * Uses CSS background-clip technique for crisp, performant gradient text.
 */
export function GradientText({
  children,
  className,
  direction = "lr",
  animated = false,
  as: Tag = "span",
}: GradientTextProps) {
  const directionClass = {
    lr: "bg-gradient-to-r",
    rl: "bg-gradient-to-l",
    diagonal: "bg-gradient-to-br",
  }[direction];

  return (
    <Tag
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "from-[#2563EB] via-[#4F7EF0] to-[#7C3AED]",
        directionClass,
        animated && "animate-gradient-shift bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
