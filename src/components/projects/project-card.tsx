"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Project } from "@/types";
import { ExternalLink, Github, Folder } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <GlowCard className={cn("flex flex-col h-full", className)}>
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-[#09090B]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#18181B] to-[#09090B]">
            <Folder className="size-12 text-white/10" />
          </div>
        )}
        
        {/* Top actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <StatusBadge status={project.status} pulse={project.status === "production"} />
          <div className="flex gap-2">
            {project.githubUrl && (
              <Link 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 transition-colors hover:bg-black/80 hover:text-[#2563EB]"
                aria-label="View source on GitHub"
              >
                <Github className="size-4" />
              </Link>
            )}
            {project.demoUrl && (
              <Link 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 transition-colors hover:bg-black/80 hover:text-[#2563EB]"
                aria-label="View live project"
              >
                <ExternalLink className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2 group-hover:text-[#2563EB] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} size="sm" />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-[#A1A1AA] flex items-center ml-1">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
