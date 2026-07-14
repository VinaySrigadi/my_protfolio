"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayStart?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  as?: "div" | "ul" | "ol" | "section";
}

const easing: Easing = [0.0, 0.0, 0.2, 1.0];

function makeChildVariants(distance: number, duration: number): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: easing },
    },
  };
}

/**
 * StaggerChildren — container that animates each direct child in sequence.
 */
export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delayStart = 0.1,
  once = true,
  threshold = 0.1,
  as: Tag = "div",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delayStart,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(Tag !== "div" ? "" : "", className)}
      // Use data attribute so downstream CSS can target the semantic tag if needed
      data-tag={Tag}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — must be a direct child of StaggerChildren.
 */
export function StaggerItem({
  children,
  className,
  distance = 20,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  return (
    <motion.div
      variants={makeChildVariants(distance, duration)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
