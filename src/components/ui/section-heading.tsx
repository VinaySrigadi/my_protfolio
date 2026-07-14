import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "Selected Work" */
  eyebrow?: string;
  title: string;
  /** The part of the title rendered with gradient — should match a substring of title */
  gradientWord?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * SectionHeading — consistent section title block used across all homepage sections.
 * Renders eyebrow → h2 title → optional description.
 */
export function SectionHeading({
  eyebrow,
  title,
  gradientWord,
  description,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  const renderTitle = () => {
    if (!gradientWord || !title.includes(gradientWord)) {
      return <span>{title}</span>;
    }
    const [before, after] = title.split(gradientWord);
    return (
      <>
        {before}
        <GradientText>{gradientWord}</GradientText>
        {after}
      </>
    );
  };

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em]",
            "text-primary"
          )}
        >
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-6 bg-current" aria-hidden="true" />
        </span>
      )}

      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        )}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
