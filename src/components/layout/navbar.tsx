"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { Container } from "./container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Navbar — fixed top navigation with:
 * - Logo (name + title)
 * - Desktop nav links with active underline
 * - Resume CTA button
 * - Theme toggle
 * - Mobile hamburger menu
 * - Scroll-triggered blur + border
 */
export function Navbar() {
  const { scrollY } = useScrollPosition();
  const isScrolled = scrollY > 20;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0], delay: 0.1 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-[200] transition-all duration-300",
        isScrolled
          ? "border-b border-white/[0.08] bg-[#09090B]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] rounded-md"
            aria-label={`${siteConfig.name} — home`}
          >
            {/* Monogram mark */}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-xs font-bold text-white shadow-lg shadow-[#2563EB]/25 transition-shadow duration-300 group-hover:shadow-[#2563EB]/50"
            >
              {siteConfig.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>

            {/* Name */}
            <span className="hidden font-semibold text-sm tracking-tight text-[#FAFAFA] sm:block">
              {siteConfig.author.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {siteConfig.nav.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Resume CTA — desktop only */}
            <Link
              href={siteConfig.resumeUrl}
              download
              className={cn(
                "hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium md:flex",
                "bg-[#2563EB] text-white transition-all duration-200",
                "hover:bg-[#3b82f6] hover:shadow-lg hover:shadow-[#2563EB]/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              )}
            >
              <Download className="size-3.5" aria-hidden="true" />
              Resume
            </Link>

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
