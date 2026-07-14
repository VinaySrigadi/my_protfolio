import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Consistent vertical padding scale */
  spacing?: "sm" | "md" | "lg" | "xl";
  id?: string;
  narrow?: boolean;
  /** Skip Container — use when the section has full-bleed children */
  noContainer?: boolean;
  as?: "section" | "div" | "article";
}

const spacingClass = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

/**
 * Section — vertical rhythm wrapper that optionally wraps content in Container.
 */
export function Section({
  children,
  className,
  spacing = "lg",
  id,
  narrow = false,
  noContainer = false,
  as: Tag = "section",
}: SectionProps) {
  const inner = noContainer ? (
    children
  ) : (
    <Container narrow={narrow}>{children}</Container>
  );

  return (
    <Tag id={id} className={cn(spacingClass[spacing], className)}>
      {inner}
    </Tag>
  );
}
