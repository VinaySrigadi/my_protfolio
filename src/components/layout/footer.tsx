import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "./container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

const socialIcons: Record<SocialLink["platform"], React.FC<{ className?: string }>> = {
  github: ({ className }) => <Github className={className} aria-hidden="true" />,
  linkedin: ({ className }) => <Linkedin className={className} aria-hidden="true" />,
  email: ({ className }) => <Mail className={className} aria-hidden="true" />,
  twitter: ({ className }) => <span className={className} aria-hidden="true">𝕏</span>,
  scholar: ({ className }) => <span className={className} aria-hidden="true">GS</span>,
};

const footerNav = [
  {
    label: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Research", href: "/research" },
      { label: "Experience", href: "/experience" },
    ],
  },
  {
    label: "Content",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

/**
 * Footer — site-wide footer with nav columns, social links, and copyright.
 * Server component — no interactivity required.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/[0.08] bg-background"
      aria-label="Site footer"
    >
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-1 flex flex-col gap-4 md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3 w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`${siteConfig.name} — home`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-xs font-bold text-white"
                >
                  {siteConfig.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="font-semibold text-sm text-foreground">
                  {siteConfig.author.name}
                </span>
              </Link>

              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {siteConfig.title}. Building intelligent systems at the
                intersection of AI research and production engineering.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3" aria-label="Social links">
                {siteConfig.social.map((link) => {
                  const Icon = socialIcons[link.platform];
                  return (
                    <Link
                      key={link.platform}
                      href={link.href}
                      target={link.platform !== "email" ? "_blank" : undefined}
                      rel={link.platform !== "email" ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        "border border-border bg-muted/30 text-muted-foreground",
                        "transition-colors duration-200",
                        "hover:border-border/80 hover:bg-muted/50 hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      <Icon className="size-3.5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Nav columns */}
            {footerNav.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </h3>
                <nav aria-label={`${group.label} links`}>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {siteConfig.author.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-foreground">Next.js 15</span>,{" "}
            <span className="text-foreground">TypeScript</span> &{" "}
            <span className="text-foreground">Tailwind CSS v4</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
