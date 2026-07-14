import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use a narrower max-width for text-heavy content (e.g. blog) */
  narrow?: boolean;
  as?: "div" | "main" | "section" | "article" | "aside";
}

/**
 * Container — constrains content to a consistent max-width with
 * responsive horizontal padding. Used as the core layout primitive.
 */
export function Container({
  children,
  className,
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}
