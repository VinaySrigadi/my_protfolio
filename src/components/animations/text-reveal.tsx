"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const easing: Easing = [0.22, 1, 0.36, 1];

/**
 * TextReveal — reveals text word-by-word or character-by-character using
 * a clip-path slide-up technique for a clean, editorial feel.
 */
export function TextReveal({
  text,
  className,
  by = "word",
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  once = true,
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const units = by === "word" ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const unitVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: easing },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLSpanElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block leading-tight"
          aria-hidden="true"
        >
          <motion.span variants={unitVariants} className="inline-block">
            {unit}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
