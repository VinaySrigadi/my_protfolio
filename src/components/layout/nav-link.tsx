"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  /** Render as a mobile menu item */
  mobile?: boolean;
}

/**
 * NavLink — a single navigation link that highlights when its route is active.
 * Supports both desktop inline and mobile full-width variants.
 */
export function NavLink({ item, onClick, mobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  if (mobile) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={cn(
          "flex w-full items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200",
          isActive
            ? "bg-[#2563EB]/10 text-[#FAFAFA]"
            : "text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA]"
        )}
      >
        {item.label}
        {isActive && (
          <span
            className="ml-auto size-1.5 rounded-full bg-[#2563EB]"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "relative px-1 py-0.5 text-sm font-medium transition-colors duration-200",
        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left",
        "after:scale-x-0 after:bg-[#2563EB] after:transition-transform after:duration-300",
        "hover:after:scale-x-100",
        isActive
          ? "text-[#FAFAFA] after:scale-x-100"
          : "text-[#A1A1AA] hover:text-[#FAFAFA]"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}
