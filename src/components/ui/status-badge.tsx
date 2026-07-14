import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Status = Project["status"];

const statusConfig: Record<
  Status,
  { label: string; dotClass: string; badgeClass: string }
> = {
  production: {
    label: "Production",
    dotClass: "bg-emerald-400",
    badgeClass:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  },
  research: {
    label: "Research",
    dotClass: "bg-blue-400",
    badgeClass: "border-blue-400/20 bg-blue-400/10 text-blue-400",
  },
  archived: {
    label: "Archived",
    dotClass: "bg-zinc-400",
    badgeClass: "border-zinc-400/20 bg-zinc-400/10 text-zinc-400",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
  /** Show animated ping dot */
  pulse?: boolean;
}

/**
 * StatusBadge — displays project status with a coloured dot indicator.
 */
export function StatusBadge({
  status,
  className,
  pulse = false,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.badgeClass,
        className
      )}
    >
      <span className="relative flex size-1.5">
        {pulse && status === "production" && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              config.dotClass
            )}
            aria-hidden="true"
          />
        )}
        <span
          className={cn("relative inline-flex size-1.5 rounded-full", config.dotClass)}
        />
      </span>
      {config.label}
    </span>
  );
}
