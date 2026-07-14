"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

/**
 * BackToTop — appears after scrolling 400px.
 * Smooth-scrolls to the top when clicked.
 * Keyboard-accessible and screen-reader friendly.
 */
export function BackToTop() {
  const { scrollY } = useScrollPosition();
  const isVisible = scrollY > 400;

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleClick}
          aria-label="Scroll back to top"
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex size-10 items-center justify-center rounded-full",
            "border border-border bg-surface/80 backdrop-blur-sm",
            "text-muted-foreground shadow-lg transition-colors duration-200",
            "hover:border-[#2563EB]/40 hover:bg-primary/10 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
