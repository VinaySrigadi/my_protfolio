"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen — full-viewport overlay shown on first page load.
 * Fades out after 1.5s (or after an optional onComplete callback fires).
 *
 * Mount this in the root layout; it disappears automatically.
 */
export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[700] flex flex-col items-center justify-center bg-[#09090B]"
          aria-label="Loading"
          role="status"
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute size-16 rounded-full border-2 border-transparent border-t-[#2563EB]"
              aria-hidden="true"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute size-10 rounded-full border-2 border-transparent border-t-[#7C3AED]"
              aria-hidden="true"
            />
            {/* Center dot */}
            <div
              className="size-3 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED]"
              aria-hidden="true"
            />
          </motion.div>

          {/* Name fade in */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 font-mono text-xs tracking-[0.3em] text-[#A1A1AA] uppercase"
          >
            Vinay Srigadi
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
