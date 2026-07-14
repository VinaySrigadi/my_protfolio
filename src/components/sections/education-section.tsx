"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { education } from "@/data";
import { GraduationCap, Calendar } from "lucide-react";

export function EducationSection() {
  return (
    <Section id="education" spacing="lg">
      <SectionHeading 
        eyebrow="Education"
        title="Academic Background"
        gradientWord="Academic"
        description="My formal education in Computer Science and Applications."
      />

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {education.map((edu, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="mb-12 last:mb-0 relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-[#2563EB] border-4 border-[#09090B] box-content shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-[#FAFAFA]">{edu.degree}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[#A1A1AA]">
                    <GraduationCap className="size-4" />
                    <span className="font-medium text-[#E4E4E7]">{edu.institution}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                  <Calendar className="size-3.5" />
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              
              {edu.gpa && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-sm font-medium">
                  {edu.gpa}
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
