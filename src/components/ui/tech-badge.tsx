import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * TechBadge — pill-shaped badge for displaying technology names.
 * Used in project cards, skill sections, and experience timelines.
 */
export function TechBadge({ label, className, size = "md" }: TechBadgeProps) {
  const sizeClass = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-mono font-medium",
        "border border-white/10 bg-white/5",
        "text-[#A1A1AA] transition-colors duration-200",
        "hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10 hover:text-[#FAFAFA]",
        sizeClass,
        className
      )}
    >
      {label}
    </span>
  );
}
