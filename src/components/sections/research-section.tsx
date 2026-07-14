"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { GlowCard } from "@/components/ui/glow-card";
import { publications } from "@/data";
import { BookOpen, ExternalLink, Users } from "lucide-react";
import Link from "next/link";


export function ResearchSection() {
  if (!publications.length) return null;

  return (
    <Section id="research" spacing="lg">
      <SectionHeading 
        eyebrow="Publications"
        title="Research Contributions"
        gradientWord="Research"
        description="Academic papers and research contributions in the field of Artificial Intelligence."
      />

      <StaggerChildren className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {publications.map((pub, idx) => (
          <StaggerItem key={idx}>
            <GlowCard className="p-6 h-full flex flex-col group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-2.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                  <BookOpen className="size-5" />
                </div>
                {pub.paperUrl && (
                  <Link 
                    href={pub.paperUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-[#A1A1AA] hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors"
                    aria-label={`Read ${pub.title}`}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                {pub.title}
              </h3>
              
              <div className="mt-auto pt-4 space-y-3 border-t border-white/5">
                <div className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <Users className="size-4 shrink-0 mt-0.5 text-[#2563EB]/70" />
                  <span>{pub.authors.join(", ")}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#FAFAFA]">{pub.venue}</span>
                  <span className="text-[#A1A1AA]">{pub.year}</span>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
