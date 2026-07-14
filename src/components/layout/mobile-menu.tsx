"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "./nav-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * MobileMenu — hamburger button + Sheet drawer for mobile navigation.
 * Uses Base UI Sheet (via shadcn), which renders SheetTrigger as a native button.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* SheetTrigger renders its own <button> — we render icon inside */}
      <SheetTrigger
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className={cn(
          "flex size-9 items-center justify-center rounded-lg",
          "border border-border bg-muted/30 text-muted-foreground",
          "transition-colors hover:border-border/80 hover:bg-muted/50 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "md:hidden"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </SheetTrigger>

      <SheetContent
        id="mobile-nav"
        side="right"
        className="w-72 border-border bg-background p-0"
      >
        <SheetHeader className="border-b border-white/[0.08] px-6 py-4">
          <SheetTitle className="text-left font-mono text-sm font-medium text-foreground">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <nav id="mobile-nav" aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              mobile
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>

        <div className="border-t border-white/[0.08] p-4">
          <Link
            href={siteConfig.resumeUrl}
            download
            onClick={() => setOpen(false)}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg",
              "bg-primary px-4 py-3 text-sm font-medium text-white",
              "transition-colors hover:bg-[#3b82f6]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <Download className="size-4" aria-hidden="true" />
            Download Resume
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
