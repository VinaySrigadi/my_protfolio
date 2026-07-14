"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { experiences } from "@/data";
import { Briefcase, Calendar } from "lucide-react";
import { TechBadge } from "@/components/ui/tech-badge";

export function ExperienceSection() {
  return (
    <Section id="experience" spacing="lg">
      <SectionHeading 
        eyebrow="Experience"
        title="Professional Journey"
        gradientWord="Journey"
        description="A timeline of my professional roles, internships, and key contributions to the industry."
      />

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="mb-12 last:mb-0 relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-[#2563EB] border-4 border-[#09090B] box-content shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#FAFAFA]">{exp.role}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[#A1A1AA]">
                    <Briefcase className="size-4" />
                    <span className="font-medium text-[#E4E4E7]">{exp.company}</span>
                    <span>&bull;</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                  <Calendar className="size-3.5" />
                  {exp.startDate} - {exp.endDate || "Present"}
                </div>
              </div>
              
              <ul className="space-y-3 text-[#A1A1AA] leading-relaxed mb-6">
                {exp.description.map((highlight, hIdx) => (
                  <li key={hIdx} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#2563EB]/60">
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} size="sm" />
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
