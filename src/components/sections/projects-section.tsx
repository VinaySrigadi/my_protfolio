"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { ProjectCard } from "@/components/projects/project-card";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  // Only show featured projects on homepage
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <Section id="projects" spacing="lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading 
          eyebrow="Selected Work"
          title="Featured Projects"
          gradientWord="Projects"
          description="A selection of my recent work in AI engineering, full-stack development, and system architecture."
          align="left"
          className="mb-0"
        />
        
        <MagneticButton strength={0.2} className="shrink-0 hidden md:flex">
          <Link
            href="/projects"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5",
              "text-sm font-medium text-[#FAFAFA] transition-colors",
              "hover:bg-white/10 hover:border-white/20 hover:text-[#2563EB]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            )}
          >
            View all projects
            <ArrowRight className="size-4" />
          </Link>
        </MagneticButton>
      </div>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerChildren>
      
      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/projects"
          className={cn(
            "inline-flex w-full justify-center items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3",
            "text-sm font-medium text-[#FAFAFA] transition-colors hover:bg-white/10 hover:border-white/20 hover:text-[#2563EB]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          )}
        >
          View all projects
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
